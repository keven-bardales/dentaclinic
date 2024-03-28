import { signIn } from "next-auth/react";
import { loginUserSchema } from "../(schemas)/login-user.schema";
import * as z from "zod";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof loginUserSchema>) => {
  const validatedFields = loginUserSchema.safeParse(values);

  if (!validatedFields.success) {
    let errors: string[] = [];

    validatedFields.error.errors.forEach((error) => {
      errors.push(error.message);
    });

    return {
      errors,
      success: false,
    };
  }

  const { loginCredential, password } = validatedFields.data;

  try {
    const response = await signIn("credentials", {
      loginCredential,
      password,
      redirect: false,
    });

    console.log(response);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errors: ["Credenciales inválidas"],
            success: false,
          };
        default:
          return {
            errors: ["Error desconocido"],
            success: false,
          };
      }
    }
    throw error;
  }
};
