import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession, verifySession } from "./session";

/** Admin login only works once both secrets are set to strong values. */
export function authConfigured(): boolean {
  return (process.env.ADMIN_PASSWORD ?? "").length >= 12 && (process.env.AUTH_SECRET ?? "").length >= 32;
}

export function passwordMatches(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!authConfigured()) return false;
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function startSession(): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, await signSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function endSession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  return verifySession((await cookies()).get(SESSION_COOKIE)?.value);
}

/** For pages: send visitors without a valid session to the login screen. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}

/* Login throttling: 5 wrong passwords per IP locks that IP out for 15 minutes.
   Kept in memory per server instance, which is enough alongside a long password. */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;
const failures = new Map<string, number[]>();

export function loginLocked(ip: string): boolean {
  const recent = (failures.get(ip) ?? []).filter((t) => Date.now() - t < WINDOW_MS);
  failures.set(ip, recent);
  return recent.length >= MAX_FAILURES;
}

export function recordLoginFailure(ip: string): void {
  failures.set(ip, [...(failures.get(ip) ?? []), Date.now()]);
}

export function clearLoginFailures(ip: string): void {
  failures.delete(ip);
}
