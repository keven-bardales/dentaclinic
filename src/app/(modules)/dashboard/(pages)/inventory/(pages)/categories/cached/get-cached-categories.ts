import { cache } from "@/lib/utils/cache";
import { CATEGORIESCACHEKEYS } from "../cache-keys/categories-cached-keys";
import { GetCategoriesListUseCase } from "@/features/category/domain/use-cases/get-all-categories.use-case";

export const getCachedCategories = cache(
  async () => {
    const useCase = new GetCategoriesListUseCase();

    const categories = await useCase.execute();

    return categories;
  },

  [CATEGORIESCACHEKEYS.CATEGORIES.key],
  {
    revalidate: CATEGORIESCACHEKEYS.CATEGORIES.revalidate,
    tags: CATEGORIESCACHEKEYS.CATEGORIES.tags,
  }
);
