import { NextResponse } from "next/server";
import { flattenedRoutes, nextAuthPrefix } from "./app/(modules)/(dashboard)/(constants)/navigation/navigation";
import authConfig from "../auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const isLoggedIn = !!request.auth;

  const isApiAuthRoute = pathname.startsWith(nextAuthPrefix);
  const agendaUrl = new URL("/agenda", request.url);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  const mainRoutes = flattenedRoutes;

  const protectedRoutes = mainRoutes.filter((route) => route.isProtected);

  if (protectedRoutes.some((route) => route?.href.includes(pathname)) && !isLoggedIn) {
    const loginUrl = new URL("/auth/sign-in", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/auth/sign-in" && isLoggedIn) {
    return NextResponse.redirect(agendaUrl);
  }

  if (pathname == "/") {
    if (!isLoggedIn) {
      const loginUrl = new URL("/auth/sign-in", request.url);
      return NextResponse.redirect(loginUrl);
    } else {
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
