import { cache } from "@/lib/utils/cache";
import { PRODUCTSCACHEKEYS } from "../cache-keys/products-cached-keys";
import { GetProductsListUseCase } from "@/features/product/domain/use-cases/get-all-products-use-case";

export const getCachedProducts = cache(
  async () => {
    const useCase = new GetProductsListUseCase();

    const products = await useCase.execute();

    return products;
  },

  [PRODUCTSCACHEKEYS.PRODUCTS.key],
  {
    revalidate: PRODUCTSCACHEKEYS.PRODUCTS.revalidate,
    tags: PRODUCTSCACHEKEYS.PRODUCTS.tags,
  }
);
