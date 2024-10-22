import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "default_secret";
const NEXTAUTH_SALT = process.env.NEXTAUTH_SALT || "default_salt";

export async function middleware(req) {
  console.log('Middleware executed for path:', req.nextUrl.pathname)
  const token = await getToken({
    req,
    secret: NEXTAUTH_SECRET,
    salt: NEXTAUTH_SALT,
  });

  const { pathname } = req.nextUrl;

  // Check for session_token in cookies
  const sessionToken = req.cookies.get('session_token');
  const tokenPreview = sessionToken?.value ? sessionToken.value.slice(0, 10) + '...' : 'undefined';
  console.log('sessionToken (first 10 chars):', tokenPreview);

  // Allow the requests if the following is true...
  // 1) It's a request for next-auth session & provider fetching
  // 2) the token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Redirect to "/" if there's no token or session_token when accessing /dashboard
  if (pathname.startsWith('/dashboard') && (sessionToken==undefined)) {
    const response = NextResponse.redirect(new URL("/", req.url));
    response.headers.set('X-Auth-Error', 'Please log in to view the customer page');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
