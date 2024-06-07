"use server";

import { revalidateTag } from "next/cache";
import { CATEGORIESCACHEKEYS } from "../cache-keys/categories-cached-keys";
import { DeleteCategoryUseCase } from "@/features/category/domain/use-cases/delete-category-use-case";

export const deleteCategoryAction = async (payload: { categoryId: number }) => {
  const useCase = new DeleteCategoryUseCase();

  const result = await useCase.execute(payload);

  CATEGORIESCACHEKEYS.CATEGORIES.tags.forEach((tag) => {
    revalidateTag(tag);
  });

  return JSON.stringify(result);
};
