// middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Allow the requests if the following is true...
  // 1) It's a request for next-auth session & provider fetching
  // 2) the token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Redirect them to login if they don't have the token AND are requesting a protected route
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

// Specify the paths to protect
export const config = {
  matcher: ["/dashboard/:path*"],
};
