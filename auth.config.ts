import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db/db";
import credentials from "next-auth/providers/credentials";
import { loginUserSchema } from "@/app/(modules)/auth/(schemas)/login-user.schema";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/app/(modules)/(user)/(queries)/get-user-by-email";

export default {
  providers: [
    credentials({
      authorize: async (credentials) => {
        const validatedFields = loginUserSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { loginCredential, password } = validatedFields.data;

        const user = await getUserByEmail(loginCredential);

        if (!user) {
          return null;
        }

        if (!user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          return null;
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  events: {
    signIn: async (message) => {
      console.log("signIn", message);
    },
    signOut: async (message) => {
      console.log("signOut", message);
    },
    createUser: async (message) => {
      console.log("createUser", message);
    },
    updateUser: async (message) => {
      console.log("updateUser", message);
    },
    linkAccount: async (message) => {
      console.log("linkAccount", message);
    },
    session: async (message) => {
      console.log("session", message);
    },
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
