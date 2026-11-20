import "server-only";
import { requireAdmin } from "./auth";
import { db, hasDatabase } from "./db";

export type DatabaseProblem = "missing" | "unreachable" | "empty";

/**
 * Gate for every admin page: requires a signed-in admin, then reports whether
 * the database is ready to be edited.
 */
export async function adminGate(): Promise<DatabaseProblem | null> {
  await requireAdmin();
  if (!hasDatabase()) return "missing";
  try {
    const profile = await db().setting.findUnique({ where: { key: "profile" }, select: { key: true } });
    return profile ? null : "empty";
  } catch (error) {
    console.error("Admin could not reach the database:", error);
    return "unreachable";
  }
}
