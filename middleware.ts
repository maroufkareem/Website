import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "./lib/auth";

/**
 * Serves the quizzes subdomain (quizzes.example.com) from the same app by
 * rewriting its requests onto the /quizzes routes, so the host shows a
 * dedicated site while everything stays in one deployment.
 *
 * Rewrites are internal: the visitor's URL stays quizzes.example.com/…
 */
function quizzesHostRewrite(request: NextRequest): NextResponse | null {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  if (!host.startsWith("quizzes.")) return null;

  const { pathname } = request.nextUrl;

  // Everything the app needs to keep working on this host untouched.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/marouf-assets") ||
    pathname === "/favicon.svg" ||
    pathname === "/robots.txt"
  ) {
    return null;
  }

  // Already pointing at the quiz routes (or rewritten once) — leave it.
  if (pathname === "/quizzes" || pathname.startsWith("/quizzes/")) return null;

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/quizzes" : `/quizzes${pathname}`;
  return NextResponse.rewrite(url);
}

export async function middleware(request: NextRequest) {
  const rewrite = quizzesHostRewrite(request);
  if (rewrite) return rewrite;

  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Broadened from /admin so the quizzes host can be rewritten too; the
  // handler above returns early for anything that is not one of those cases.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
