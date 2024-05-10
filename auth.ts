import { loginUserSchema } from "@/app/(modules)/auth/(schemas)/login-user.schema";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { LoggedInUserDto } from "@/features/user/domain/dtos/logged-in-user-dto";
import { UserPermissionDto } from "@/features/user/domain/dtos/user-permissions.dto";
import { UserEntity } from "@/features/user/domain/entities/user.entity";
import { LoginUseCase } from "@/features/user/domain/use-cases/login.use-case";
import { setCookie } from "@/lib/utils/set-cookie";
import NextAuth, { CredentialsSignin, type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
        customRedirect: { label: "Custom redirect", type: "hidden" },
      },
      authorize: async (credentials) => {
        const { loginCredential, password, rememberme } = credentials as any;

        const result = await new LoginUseCase().execute(
          loginCredential,
          password,
          typeof rememberme === "string" ? JSON.parse(rememberme) : rememberme,
          credentials?.rememberMeToken as string
        );

        if (rememberme && result?.sessionToken) {
          setCookie({
            cookie: "rememberme",
            value: result?.sessionToken as string,
            path: "/",
          });
        }

        if (!result) {
          return null;
        }

        return result.user.toObject() as any;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  trustHost: true,
  callbacks: {
    jwt: async ({ token, user, account, profile, session, trigger }) => {
      if (user) {
        token.id = user?.id;
        token.image = user?.image;
        token.name = user?.name;
        token.permissions = user?.permissions;
      }
      return token;
    },
    session: async ({ session, token, user, newSession, trigger }) => {
      session.user.id = token.id as string;
      session.user.image = token.image as string;
      session.user.name = token.name as string;
      session.user.permissions = token.permissions as UserPermissionDto[];
      return session;
    },
  },
  secret: "secret",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
});
