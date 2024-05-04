import { flattenedRoutes, nextAuthPrefix } from "@/app/(modules)/(dashboard)/(constants)/navigation/navigation";
import { auth } from "@/root/auth";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { routeMatchesPattern } from "../utils/route-match-pattern";
import { CustomChainingMiddleware } from "../utils/middleWare-chaining";
import { RouteMiddleware } from "./withPermissionsMiddleWare";

export function authMiddleWare(middleware: CustomChainingMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // The first middleware in the chain has to create the response
    // object and pass it down the chain.
    const response = NextResponse.next();
    // response.cookies.set("vercel", "fast");

    // Perform whatever logic the first middleware needs to do

    // Call the next middleware and pass the request and response

    const { pathname } = request.nextUrl;

    const session = await auth();
    const isLoggedIn = !!session;

    const isApiAuthRoute = pathname.startsWith(nextAuthPrefix);
    const agendaUrl = new URL("/agenda", request.url);
    const loginUrl = new URL("/auth/sign-in", request.url);

    if (isApiAuthRoute) {
      return NextResponse.next();
    }

    const requestedRoute = flattenedRoutes.find((route) => routeMatchesPattern(route.href, pathname));

    const runRoutesMiddleWares = (middleWares: RouteMiddleware[], index = 0) => {
      const current = middleWares[index];

      if (current) {
        const next = runRoutesMiddleWares(middleWares, index + 1);
        return current(request);
      }

      return response;
    };

    if (requestedRoute) {
      if (requestedRoute.middleWares.length > 0) {
        return runRoutesMiddleWares(requestedRoute.middleWares);
      }
    }

    if (requestedRoute?.isProtected && !isLoggedIn) {
      return NextResponse.redirect(loginUrl);
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
  };
}
