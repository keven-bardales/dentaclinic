import { auth } from "@/root/auth";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

export const withPermissions =
  (requiredPermissions: string[], shouldMatchAll = true) =>
  async (request: NextRequest) => {
    const session = await auth();
    const isLoggedIn = !!session;
    const loginUrl = new URL("/auth/sign-in", request.url);

    if (!isLoggedIn) {
      return NextResponse.redirect(loginUrl);
    }

    let hasPermission = true;

    if (shouldMatchAll) {
      hasPermission = requiredPermissions.every((required) => session?.user?.permissions.some((permission) => required == permission.name));
    }

    if (!shouldMatchAll) {
      hasPermission = requiredPermissions.some((required) => session?.user?.permissions.some((permission) => required == permission.name));
    }

    if (hasPermission) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  };

// Definición del tipo para el middleware de ruta
export type RouteMiddleware = (request: NextRequest) => Promise<NextResponse>;
