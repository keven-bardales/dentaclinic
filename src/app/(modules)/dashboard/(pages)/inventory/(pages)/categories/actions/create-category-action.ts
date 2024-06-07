"use server";
import { createCategorySchema } from "@/features/category/domain/schemas/create-category-schema";
import { CreateCategoryUseCase } from "@/features/category/domain/use-cases/create-new-category-use-case";
import { revalidateTag } from "next/cache";
import * as z from "zod";
import { CATEGORIESCACHEKEYS } from "../cache-keys/categories-cached-keys";

export const createCategoryAction = async (values: z.infer<typeof createCategorySchema>) => {
  const useCase = new CreateCategoryUseCase();

  const result = await useCase.execute(values);

  CATEGORIESCACHEKEYS.CATEGORIES.tags.forEach((tag) => {
    revalidateTag(tag);
  });

  return JSON.stringify(result);
};
