import { LoggedInUserDto } from "@/features/user/domain/dtos/logged-in-user-dto";
import NextAuth, { CredentialsSignin, type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db/db";
import { GetBySessionTokenUseCase } from "@/features/user/domain/use-cases/get-by-session-token-use-case";
import { UserPermissionDto } from "@/features/user/domain/dtos/user-permissions.dto";
import { tr } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client/extension";
import { use } from "react";
import { setCookie } from "@/lib/utils/set-cookie";
import Credentials from "next-auth/providers/credentials";
import { LoginUseCase } from "@/features/user/domain/use-cases/login.use-case";

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
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        loginCredential: { label: "Username" },
        password: { label: "Password", type: "password" },
        rememberme: { label: "Remember me", type: "checkbox" },
        rememberMeToken: { label: "Remember me token", type: "hidden" },
      },
      authorize: async (credentials) => {
        const { loginCredential, password, rememberme } = credentials as any;

        const rememberMeIsTrue = rememberme === "true" || rememberme == true;

        const result = await new LoginUseCase().execute(loginCredential, password, rememberMeIsTrue, credentials?.rememberMeToken as string);

        if (rememberMeIsTrue && result?.session?.sessionToken) {
          setCookie({
            cookie: "rememberme",
            value: result?.session?.sessionToken,
            path: "/",
          });
        }

        if (!result) {
          return null;
        }

        return result.toObject() as any;
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  trustHost: true,
  secret: "secret",
  callbacks: {
    jwt: async ({ token, user, account, profile, session, trigger }) => {
      if (user) {
        token.id = user?.id;
        token.image = user?.image;
        token.name = user?.name;
        token.permissions = user?.permissions;
        token.sessionToken = user?.session.sessionToken;
        token.expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        return token;
      }

      const dateFormatter = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      if (!token.expiresAt) {
        return null;
      }

      const expiresAt = token.expiresAt as Date;
      const today = new Date();
      if (today < new Date(expiresAt)) {
        return token;
      }
      if (today > new Date(expiresAt)) {
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
        token.expiresAt = new Date(Date.now() + 10 * 60 * 1000);

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
      if (token) {
        session.user.id = token.id as string;
        session.user.image = token.image as string;
        session.user.name = token.name as string;
        session.user.permissions = token.permissions as UserPermissionDto[];
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 2592000,
  },
});
