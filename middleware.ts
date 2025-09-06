import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Example: Block access to /admin if no token
  const token = request.cookies.get("session")?.value;

  if (!token && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // continue normally
}

// Apply only to these routes
export const config = {
  matcher: ["/admin/:path*"],
};
