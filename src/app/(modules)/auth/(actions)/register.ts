"use server";
import * as z from "zod";
import { registerUserSchema } from "../(schemas)/register-user.schema";
import { db } from "@/lib/db/db";

export const registerUser = async (values: z.infer<typeof registerUserSchema>) => {
  const validatedFields = registerUserSchema.safeParse(values);

  if (!validatedFields.success) {
    let errors: string[] = [];

    validatedFields.error.errors.forEach((error) => {
      errors.push(error.message);
    });

    return {
      error: "Error al registrar usuario",
      errors,
    };
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      error: "El usuario ya existe",
    };
  }

  await db.user.create({
    data: {
      email,
      password,
      name,
    },
  });

  return { message: "Usuario registrado correctamente" };
};
