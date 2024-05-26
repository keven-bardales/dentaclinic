import { auth } from "@/root/auth";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { routeMatchesPattern } from "../utils/route-match-pattern";
import { CustomChainingMiddleware } from "../utils/middleWare-chaining";
import { RouteMiddleware } from "./withPermissionsMiddleWare";
import { flattenedRoutes, nextAuthPrefix } from "@/app/(modules)/dashboard/(constants)/navigation/navigation";
import { PermissionsByModule } from "@/features/common/domain/enums/permissions-enum";

export function authMiddleWare(middleware: CustomChainingMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // The first middleware in the chain has to create the response
    // object and pass it down the chain.

    const session = await auth();

    const isLoggedIn = !!session;

    const { pathname } = request.nextUrl;

    const isApiAuthRoute = pathname.startsWith(nextAuthPrefix);

    if (isApiAuthRoute) {
      return NextResponse.next();
    }

    const agendaUrl = new URL("/dashboard/commercial/quotations", request.url);
    const loginUrl = new URL(`/auth/sign-in?pathname=${pathname}`, request.url);
    const basePath = new URL("/", request.url);

    const requestedRoute = flattenedRoutes.find((route) => routeMatchesPattern(route.href, pathname));

    if (requestedRoute?.isProtected && !isLoggedIn) {
      return NextResponse.redirect(loginUrl);
    }
    const runRoutesMiddleWares = (middleWares: RouteMiddleware[], index = 0) => {
      const current = middleWares[index];

      if (current) {
        const next = runRoutesMiddleWares(middleWares, index + 1);
        return current(request);
      }
    };

    if (requestedRoute) {
      if (requestedRoute.middleWares.length > 0) {
        return runRoutesMiddleWares(requestedRoute.middleWares);
      }
    }

    if (pathname === "/auth" && !isLoggedIn) {
      return NextResponse.redirect(loginUrl);
    }

    if (pathname == "/dashboard") {
      const canViewDashboard = session?.user.permissions?.some((permission) => permission?.name == PermissionsByModule?.DASHBOARD.CANVIEWDASHBOARD);

      if (isLoggedIn && canViewDashboard) {
        return NextResponse.redirect(agendaUrl);
      }

      if (isLoggedIn && !canViewDashboard) {
        return NextResponse.redirect(loginUrl);
      }

      if (!isLoggedIn) {
        return NextResponse.redirect(basePath);
      }
    }

    return NextResponse.next();
  };
}
