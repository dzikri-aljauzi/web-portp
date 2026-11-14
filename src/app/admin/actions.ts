"use server";

import { updateTag } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { z } from "zod";
import {
  authConfigured,
  clearLoginFailures,
  endSession,
  isAdmin,
  loginLocked,
  passwordMatches,
  recordLoginFailure,
  startSession,
} from "@/lib/auth";
import { CONTENT_TAG } from "@/lib/content";
import { db, hasDatabase } from "@/lib/db";
import { seedIfEmpty } from "@/lib/seed";
import { experienceSchema, firstIssue, profileSchema, projectSchema, skillsSchema } from "@/lib/types";

export type Result = { ok: true; id?: string } | { ok: false; error: string };

/* ------------------------------- Session ------------------------------ */

export type LoginState = { error?: string };

export async function login(_previous: LoginState, formData: FormData): Promise<LoginState> {
  if (!authConfigured()) return { error: "Admin login is not configured yet. Set ADMIN_PASSWORD (12+ characters) and AUTH_SECRET (32+ characters), then redeploy." };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (loginLocked(ip)) return { error: "Too many attempts. Try again in 15 minutes." };

  if (!passwordMatches(String(formData.get("password") ?? ""))) {
    recordLoginFailure(ip);
    await new Promise((resolve) => setTimeout(resolve, 700));
    return { error: "Wrong password." };
  }

  clearLoginFailures(ip);
  await startSession();

  if (hasDatabase()) {
    try {
      if (await seedIfEmpty()) updateTag(CONTENT_TAG);
    } catch (error) {
      // The dashboard explains what is wrong with the database.
      console.error("Could not import the default content:", error);
    }
  }
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await endSession();
  redirect("/admin/login");
}

/* ------------------------------- Helpers ------------------------------ */

/** Every mutation re-checks the session and the database itself. */
async function blocked(): Promise<Result | null> {
  if (!(await isAdmin())) return { ok: false, error: "Your session has expired. Please sign in again." };
  if (!hasDatabase()) return { ok: false, error: "No database is connected, so changes cannot be saved." };
  return null;
}

function parse<S extends z.ZodType>(schema: S, input: unknown): { data: z.infer<S> } | { error: string } {
  const result = schema.safeParse(input);
  return result.success ? { data: result.data } : { error: firstIssue(result.error) };
}

function failure(error: unknown): Result {
  if (typeof error === "object" && error !== null && (error as { code?: string }).code === "P2002") {
    return { ok: false, error: "That slug is already used by another project." };
  }
  console.error("Admin action failed:", error);
  return { ok: false, error: "Could not save. Check the database connection and try again." };
}

const saved = (id?: string): Result => {
  updateTag(CONTENT_TAG);
  return { ok: true, id };
};

/* --------------------------- Profile & skills ------------------------- */

export async function saveProfile(input: unknown): Promise<Result> {
  const stop = await blocked();
  if (stop) return stop;
  const parsed = parse(profileSchema, input);
  if ("error" in parsed) return { ok: false, error: parsed.error };
  try {
    await db().setting.upsert({
      where: { key: "profile" },
      create: { key: "profile", value: parsed.data },
      update: { value: parsed.data },
    });
    return saved();
  } catch (error) {
    return failure(error);
  }
}

export async function saveSkills(input: unknown): Promise<Result> {
  const stop = await blocked();
  if (stop) return stop;
  const parsed = parse(skillsSchema, input);
  if ("error" in parsed) return { ok: false, error: parsed.error };
  try {
    await db().setting.upsert({
      where: { key: "skills" },
      create: { key: "skills", value: parsed.data },
      update: { value: parsed.data },
    });
    return saved();
  } catch (error) {
    return failure(error);
  }
}

/* ------------------------------- Projects ----------------------------- */

export async function saveProject(id: string | null, input: unknown): Promise<Result> {
  const stop = await blocked();
  if (stop) return stop;
  const parsed = parse(projectSchema, input);
  if ("error" in parsed) return { ok: false, error: parsed.error };
  try {
    if (id) {
      await db().project.update({ where: { id }, data: parsed.data });
      return saved(id);
    }
    const last = await db().project.aggregate({ _max: { position: true } });
    const created = await db().project.create({
      data: { ...parsed.data, position: (last._max.position ?? -1) + 1 },
    });
    return saved(created.id);
  } catch (error) {
    return failure(error);
  }
}

/* ------------------------------ Experience ---------------------------- */

export async function saveExperience(id: string | null, input: unknown): Promise<Result> {
  const stop = await blocked();
  if (stop) return stop;
  const parsed = parse(experienceSchema, input);
  if ("error" in parsed) return { ok: false, error: parsed.error };
  try {
    if (id) {
      await db().experience.update({ where: { id }, data: parsed.data });
      return saved(id);
    }
    const last = await db().experience.aggregate({ _max: { position: true } });
    const created = await db().experience.create({
      data: { ...parsed.data, position: (last._max.position ?? -1) + 1 },
    });
    return saved(created.id);
  } catch (error) {
    return failure(error);
  }
}

/* ---------------------- List actions (both kinds) --------------------- */

type Kind = "project" | "experience";
const isKind = (kind: unknown): kind is Kind => kind === "project" || kind === "experience";

async function orderedIds(kind: Kind): Promise<string[]> {
  const orderBy = [{ position: "asc" as const }, { createdAt: "asc" as const }];
  const rows =
    kind === "project"
      ? await db().project.findMany({ select: { id: true }, orderBy })
      : await db().experience.findMany({ select: { id: true }, orderBy });
  return rows.map((row) => row.id);
}

export async function moveItem(kind: Kind, id: string, direction: -1 | 1): Promise<Result> {
  const stop = await blocked();
  if (stop) return stop;
  if (!isKind(kind) || (direction !== -1 && direction !== 1)) return { ok: false, error: "Invalid request." };
  try {
    const ids = await orderedIds(kind);
    const from = ids.indexOf(id);
    const to = from + direction;
    if (from === -1 || to < 0 || to >= ids.length) return { ok: true };
    [ids[from], ids[to]] = [ids[to], ids[from]];
    await db().$transaction(
      ids.map((itemId, position) =>
        kind === "project"
          ? db().project.update({ where: { id: itemId }, data: { position } })
          : db().experience.update({ where: { id: itemId }, data: { position } }),
      ),
    );
    return saved();
  } catch (error) {
    return failure(error);
  }
}

export async function setPublished(kind: Kind, id: string, published: boolean): Promise<Result> {
  const stop = await blocked();
  if (stop) return stop;
  if (!isKind(kind)) return { ok: false, error: "Invalid request." };
  try {
    if (kind === "project") await db().project.update({ where: { id }, data: { published: Boolean(published) } });
    else await db().experience.update({ where: { id }, data: { published: Boolean(published) } });
    return saved();
  } catch (error) {
    return failure(error);
  }
}

export async function deleteItem(kind: Kind, id: string): Promise<Result> {
  const stop = await blocked();
  if (stop) return stop;
  if (!isKind(kind)) return { ok: false, error: "Invalid request." };
  try {
    if (kind === "project") await db().project.delete({ where: { id } });
    else await db().experience.delete({ where: { id } });
    return saved();
  } catch (error) {
    return failure(error);
  }
}

/* -------------------------------- Media ------------------------------- */

export async function deleteMedia(id: string): Promise<Result> {
  const stop = await blocked();
  if (stop) return stop;
  try {
    await db().media.delete({ where: { id } });
    return saved();
  } catch (error) {
    return failure(error);
  }
}

/** Manual import, for when the automatic import at first login could not run. */
export async function importDefaults(): Promise<Result> {
  const stop = await blocked();
  if (stop) return stop;
  try {
    await seedIfEmpty();
    return saved();
  } catch (error) {
    return failure(error);
  }
}
