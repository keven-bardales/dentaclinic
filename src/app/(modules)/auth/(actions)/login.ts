import { loginUserSchema } from "../(schemas)/login-user.schema";
import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";

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

  const { loginCredential, password, rememberme } = validatedFields.data;

  try {
    const response = await signIn("credentials", {
      loginCredential,
      password,
      rememberme,
      redirect: false,
    });

    if (response?.error) {
      return {
        errors: ["Credenciales inválidas"],
        success: false,
      };
    } else {
      return {
        success: true,
        message: "Inicio de sesión exitoso",
      };
    }
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
