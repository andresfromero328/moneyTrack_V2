import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;

  if (token) {
    const isLinked = token.plaidLinked;
    if (!isLinked && !pathname.startsWith("/link-plaid")) {
      return NextResponse.redirect(new URL("/link-plaid", req.url));
    }
  } else if (
    !(pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/calendar/:path*",
    "/reports/:path*",
    "/sign-in",
    "/sign-up",
    "/link-plaid",
  ],
};
