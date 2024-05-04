"use server";
import * as z from "zod";
import { registerUserSchema } from "../(schemas)/register-user.schema";
import { RegisterUseCase } from "@/features/user/domain/use-cases/register.use-case";

export const registerUser = async (values: z.infer<typeof registerUserSchema>) => {
  const useCase = new RegisterUseCase();

  const result = await useCase.execute(values);

  return JSON.stringify(result);
};
