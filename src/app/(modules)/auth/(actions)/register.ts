"use server";
import * as z from "zod";
import { registerUserSchema } from "../(schemas)/register-user.schema";
import { db } from "@/lib/db/db";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../../(user)/(queries)/get-user-by-email";

export const registerUser = async (values: z.infer<typeof registerUserSchema>) => {
  const validatedFields = registerUserSchema.safeParse(values);

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

  const { email, password, name } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      errors: ["El email ya está registrado"],
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  // TODO: Send email confirmation

  return { message: "Usuario registrado correctamente", success: true };
};
