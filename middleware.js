import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "default_secret";
const NEXTAUTH_SALT = process.env.NEXTAUTH_SALT || "default_salt"; // Provide a default salt value

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: NEXTAUTH_SECRET,
    salt: NEXTAUTH_SALT,
  });

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
