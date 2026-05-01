import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function proxy(req) {

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  });

  const pathname = req.nextUrl.pathname;

  const isAuthenticated = !!token;

  // 🔒 Not logged in
  if (!isAuthenticated) {

    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // 🔒 Client route protection
  if (pathname.startsWith("/dashboard/client") && token.role !== "Client") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🔒 Caregiver route protection
  if (pathname.startsWith("/dashboard/caregiver") && token.role !== "Caregiver") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🔒 Admin route protection
  if (pathname.startsWith("/dashboard/admin") && token.role !== "Admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*"
  ],
};