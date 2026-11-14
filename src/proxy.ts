import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

/**
 * Early redirect for the admin area. This is only a convenience: every admin
 * page, server action and upload route verifies the session again itself.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const signedIn = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);
  const onLogin = pathname === "/admin/login";

  if (!signedIn && !onLogin) return NextResponse.redirect(new URL("/admin/login", request.url));
  if (signedIn && onLogin) return NextResponse.redirect(new URL("/admin", request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/admin", "/admin/:path*"] };
