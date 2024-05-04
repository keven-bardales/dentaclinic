import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { loginUserSchema } from "@/app/(modules)/auth/(schemas)/login-user.schema";
import { LoginUseCase } from "@/features/user/domain/use-cases/login.use-case";

export default {
  trustHost: true,
  providers: [
    credentials({
      authorize: async (credentials) => {
        const validatedFields = loginUserSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { loginCredential, password } = validatedFields.data;

        const result = await new LoginUseCase().execute(loginCredential, password);

        if (!result) {
          return null;
        }

        return result;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  events: {
    signIn: async (message) => {},
    signOut: async (message) => {},
    createUser: async (message) => {},
    updateUser: async (message) => {},
    linkAccount: async (message) => {},
    session: async (message) => {},
  },
  callbacks: {
    authorized: async ({ auth, request }) => {
      return true;
    },
    jwt: async ({ token, user, account, profile, session, trigger }) => {
      return token;
    },
    redirect: async ({ url, baseUrl }) => {
      return url;
    },
    session: async ({ session, token, user, newSession, trigger }) => {
      return session;
    },
    signIn: async ({ user, account, profile, email, credentials }) => {
      return true;
    },
  },
  secret: process.env.SECRET,
} satisfies NextAuthConfig;
