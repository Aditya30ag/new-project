import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Exclude public paths from auth check
  if (
    pathname.startsWith("/_next") || 
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/auth/error") ||
    pathname === "/login" ||
    pathname === "/reset-password" ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }


  const token = await getToken({ req: request });

  // Check if the user is authenticated
  if (!token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  // Role-based access control
  const role = token.role as string;
  
  // Redirecting to proper dashboard if user tries to access dashboard directly
  if (pathname === "/dashboard") {
    if (role === "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/super-admin/dashboard", request.url));
    } else if (role === "UNIVERSITY_ADMIN") {
      return NextResponse.redirect(new URL("/university-admin/dashboard", request.url));
    } else if (role === "SUB_USER") {
      return NextResponse.redirect(new URL("/sub-user/dashboard", request.url));
    }
  }

  // Check access for role-specific routes
  if (pathname.startsWith("/super-admin") && role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/university-admin") && role !== "UNIVERSITY_ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/sub-user") && role !== "SUB_USER") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Increase matcher scope to include dashboard paths
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes that are not auth routes
     * 2. /_next (Next.js internals)
     * 3. /fonts, /images (static files)
     * 4. /favicon.ico, /sitemap.xml (static files)
     */
    "/((?!api/(?!auth).*|_next/static|_next/image|fonts|images|favicon.ico|sitemap.xml).*)",
  ],
};


