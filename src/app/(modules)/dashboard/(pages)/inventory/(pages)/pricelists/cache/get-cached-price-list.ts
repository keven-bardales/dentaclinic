import { GetPriceListUseCase } from "@/features/pricelist/domain/use-cases/get-all-price-list.use-case";
import { cache } from "@/lib/utils/cache";
import { PRICELISTCACHEKEYS } from "../cache-keys/price-list-cache-keys";

export const getCachedPriceLists = cache(
  async () => {
    const useCase = new GetPriceListUseCase();

    const priceLists = await useCase.execute();

    return priceLists;
  },
  [PRICELISTCACHEKEYS.PRICELISTS.key],
  {
    revalidate: PRICELISTCACHEKEYS.PRICELISTS.revalidate,
    tags: PRICELISTCACHEKEYS.PRICELISTS.tags,
  }
);
