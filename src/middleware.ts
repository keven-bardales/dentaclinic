import { NextResponse } from "next/server";
import { flattenedRoutes, nextAuthPrefix } from "./app/(modules)/(dashboard)/(constants)/navigation/navigation";
import authConfig from "../auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

function matchesPattern(routeHref: string, pathname: string) {
  const regexPattern = new RegExp("^" + routeHref.replace(/\[id\]/g, "\\d+").replace(/:\w+/g, "\\w+") + "$");
  return regexPattern.test(pathname);
}

export default auth(async (request) => {
  const { pathname, href, searchParams, search, basePath } = request.nextUrl;

  const isLoggedIn = !!request.auth;

  const isApiAuthRoute = pathname.startsWith(nextAuthPrefix);
  const agendaUrl = new URL("/agenda", request.url);
  const loginUrl = new URL("/auth/sign-in", request.url);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  const requestedRoute = flattenedRoutes.find((route) => matchesPattern(route.href, pathname));

  if (requestedRoute) {
    for (const middleware of requestedRoute.middleWares) {
      await middleware(request);
    }
  }

  if (requestedRoute?.isProtected && !isLoggedIn) {
    return NextResponse.redirect(loginUrl);
  }

  if ((pathname === "/auth/sign-in" || pathname === "/auth") && isLoggedIn) {
    return NextResponse.redirect(agendaUrl);
  }

  if (pathname === "/auth" && !isLoggedIn) {
    return NextResponse.redirect(loginUrl);
  }

  if (pathname == "/") {
    if (!isLoggedIn) {
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
