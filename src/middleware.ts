import { NextResponse } from "next/server";
import { DashboardNavigation } from "./app/(modules)/(dashboard)/(constants)/navigation/navigation";
import authConfig from "../auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const isLoggedIn = !!request.auth;

  const protectedRoutes = DashboardNavigation.filter((route) => route.isProtected);

  if (protectedRoutes.some((route) => route.href === pathname) && !isLoggedIn) {
    const loginUrl = new URL("/auth/sign-in", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname == "/") {
    if (!isLoggedIn) {
      const loginUrl = new URL("/auth/sign-in", request.url);
      return NextResponse.redirect(loginUrl);
    } else {
      const agendaUrl = new URL("/agenda", request.url);
      return NextResponse.redirect(agendaUrl);
    }
  }
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};
