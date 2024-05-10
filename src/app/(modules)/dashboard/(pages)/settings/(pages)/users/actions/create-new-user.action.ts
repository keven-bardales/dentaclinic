"use server";
import * as z from "zod";

import { db } from "@/lib/db/db";
import { revalidateTag } from "next/cache";
import { newUserSchema } from "@/features/user/domain/schemas/new-user.schema";
import { CreateUserUseCase } from "@/features/user/domain/use-cases/create-new-user.use-case";
import { USERSCACHEKEYS } from "../cache-keys/users-cache.keys";

export default async function newUser(payload: z.infer<typeof newUserSchema>) {
  try {
    const useCase = new CreateUserUseCase();

    const result = await useCase.execute(payload);

    revalidateTag(USERSCACHEKEYS.USERS.key);

    return JSON.stringify(result);
  } catch (error: any) {
    return JSON.stringify({
      message: "Error al crear usuario",
      errors: [error.message],
    });
  }
}
