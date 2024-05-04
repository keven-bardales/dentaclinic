import { auth } from "@/root/auth";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

export const withPermissions =
  (permissions: string[], shouldMatchAll = true) =>
  async (request: NextRequest) => {
    const session = await auth();
    const isLoggedIn = !!session;
    const loginUrl = new URL("/auth/sign-in", request.url);

    if (!isLoggedIn) {
      return NextResponse.redirect(loginUrl);
    }

    const userPermissions = ["admin"];

    const hasPermission = shouldMatchAll
      ? permissions.every((permission) => userPermissions.includes(permission))
      : permissions.some((permission) => userPermissions.includes(permission));

    if (!hasPermission) {
      console.log("No tiene permisos");
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  };

// Definición del tipo para el middleware de ruta
export type RouteMiddleware = (request: NextRequest) => Promise<NextResponse>;
