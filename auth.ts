import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db/db";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [GitHub],
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
});
