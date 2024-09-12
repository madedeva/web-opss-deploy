import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.JWT_SECRET });

  const { pathname } = request.nextUrl;

  if (!token && pathname !== "/signin") {
    return NextResponse.redirect(new URL("/signin", request.url));
  } 
  if (token && pathname === "/signin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (token) {
    const userRoleId = token.roleId;

    const restrictedRoutesForRole1 = [
      "/dashboard/mypapers",
      "/dashboard/availableconference",
      "/dashboard/create-submission",
    ];

    if (restrictedRoutesForRole1.some(route => pathname.startsWith(route)) && userRoleId !== 1) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    const restrictedRoutesForRole2 = [
      "/dashboard/conference",
      "/dashboard/papers",
      "/dashboard/reviewers",
    ];

    if (restrictedRoutesForRole2.some(route => pathname.startsWith(route)) && userRoleId !== 2) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }


    const restrictedRoutesForRole3 = [
      "/dashboard/myreviews",
    ];

    if (restrictedRoutesForRole3.some(route => pathname.startsWith(route)) && userRoleId !== 3) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    const restrictedRoutesForRole4 = [
      "/dashboard/admin/conferences",
      "/dashboard/admin/users"
    ];

    if (restrictedRoutesForRole4.some(route => pathname.startsWith(route)) && userRoleId !== 4) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin"],
};
