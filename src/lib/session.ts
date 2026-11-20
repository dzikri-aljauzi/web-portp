import { SignJWT, jwtVerify } from "jose";

/** Signed admin session token. No Next.js imports, so the proxy can use it too. */

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secretKey(): Uint8Array | null {
  const secret = process.env.AUTH_SECRET ?? "";
  return secret.length >= 32 ? new TextEncoder().encode(secret) : null;
}

export async function signSession(): Promise<string> {
  const key = secretKey();
  if (!key) throw new Error("AUTH_SECRET is not configured");
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(key);
}

export async function verifySession(token: string | undefined): Promise<boolean> {
  const key = secretKey();
  if (!key || !token) return false;
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    return payload.role === "admin";
  } catch {
    return false;
  }
}
