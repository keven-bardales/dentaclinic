import { LoggedInUserDto } from "@/features/user/domain/dtos/logged-in-user-dto";
import NextAuth, { CredentialsSignin, type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db/db";
import authConfig from "./auth.config";
import { GetBySessionTokenUseCase } from "@/features/user/domain/use-cases/get-by-session-token-use-case";
import { UserPermissionDto } from "@/features/user/domain/dtos/user-permissions.dto";
import { tr } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client/extension";
import { use } from "react";
import { setCookie } from "@/lib/utils/set-cookie";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: LoggedInUserDto & DefaultSession["user"];
  }
  interface User extends LoggedInUserDto {}
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: "RefreshAccessTokenError";
  }
}

export const { signIn, signOut, auth, handlers } = NextAuth({
  callbacks: {
    jwt: async ({ token, user, account, profile, session, trigger }) => {
      if (user) {
        token.id = user?.id;
        token.image = user?.image;
        token.name = user?.name;
        token.permissions = user?.permissions;
        token.sessionToken = user?.session.sessionToken;
        token.expiresAt = new Date(Date.now() + 10 * 6000);

        return token;
      }

      const expiresAt = new Date(token.expiresAt as string);
      const today = new Date();

      if (today < expiresAt) {
        return token;
      }
      if (today > expiresAt) {
        const response = await fetch("http://localhost:3000/api/auth/refreshSession", {
          method: "POST",
          body: JSON.stringify({ sessionToken: token.sessionToken }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          return null;
        }

        const userSession = responseData.data;

        token.id = userSession?.id;
        token.image = userSession?.image;
        token.name = userSession?.name;
        token.permissions = userSession?.permissions;
        token.sessionToken = userSession?.session.sessionToken;
        token.expiresAt = new Date(Date.now() + 10 * 6000);

        if (userSession?.session?.rememberUser) {
          setCookie({
            cookie: "rememberme",
            value: userSession?.session?.sessionToken,
            path: "/",
          });
        }

        return token;
      }

      return null;
    },
    session: async ({ session, token, user, newSession, trigger }) => {
      session.user.id = token.id as string;
      session.user.image = token.image as string;
      session.user.name = token.name as string;
      session.user.permissions = token.permissions as UserPermissionDto[];

      return session;
    },
  },
  // @ts-ignore
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
