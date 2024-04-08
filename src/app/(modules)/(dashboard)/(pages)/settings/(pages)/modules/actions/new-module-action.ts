"use server";
import * as z from "zod";

import { newModuleSchema } from "../schemas/new-module-schema";
import { revalidateTag } from "next/cache";
import { NewModuleUseCase } from "@/features/module/domain/use-cases/new-module.use-case";

export default async function newModule(payload: z.infer<typeof newModuleSchema>) {
  try {
    const useCase = new NewModuleUseCase();

    const result = await useCase.execute(payload);

    revalidateTag("modules");
    revalidateTag("permissions");

    return JSON.stringify(result);
  } catch (error: any) {
    return JSON.stringify({ success: false, message: error.message });
  }
}
