import { LoginUseCase } from "@/features/user/domain/use-cases/login.use-case";
import { setCookie } from "@/lib/utils/set-cookie";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
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
    signIn: "/auth/signin",
  },
  trustHost: true,
  secret: "secret",
} satisfies NextAuthConfig;
