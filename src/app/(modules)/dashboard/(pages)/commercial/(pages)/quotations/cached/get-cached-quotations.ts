import { cache } from "@/lib/utils/cache";
import { QUOTATIONCACHEKEYS } from "../cache-keys/quotation-cache-keys";
import { GetQuotationListUseCase } from "@/features/quotation/domain/use-cases/get-all-quotations.use-case";

export const getCachedQuotations = cache(
  async () => {
    const useCase = new GetQuotationListUseCase();

    const quotations = await useCase.execute();

    return quotations;
  },

  [QUOTATIONCACHEKEYS.QUOTATIONS.key],
  {
    revalidate: QUOTATIONCACHEKEYS.QUOTATIONS.revalidate,
    tags: QUOTATIONCACHEKEYS.QUOTATIONS.tags,
  }
);
