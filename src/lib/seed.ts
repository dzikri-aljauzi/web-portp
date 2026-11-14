import "server-only";
import { defaultContent } from "@/data/defaults";
import { db } from "./db";

/** Default items carry a placeholder id; the database assigns real ones. */
function withoutId<T extends { id: string }>(item: T): Omit<T, "id"> {
  const copy: Partial<T> = { ...item };
  delete copy.id;
  return copy as Omit<T, "id">;
}

/**
 * Copies the built-in content into an empty database so the admin starts from
 * what the site already shows. Does nothing once a profile exists.
 * Returns true when content was imported.
 */
export async function seedIfEmpty(): Promise<boolean> {
  const existing = await db().setting.findUnique({ where: { key: "profile" } });
  if (existing) return false;

  const { profile, skills, projects, experiences } = defaultContent;
  await db().$transaction([
    db().setting.create({ data: { key: "profile", value: profile } }),
    db().setting.create({ data: { key: "skills", value: skills } }),
    db().project.createMany({
      data: projects.map((project, position) => ({ ...withoutId(project), position })),
      skipDuplicates: true,
    }),
    db().experience.createMany({
      data: experiences.map((experience, position) => ({ ...withoutId(experience), position })),
    }),
  ]);
  return true;
}
