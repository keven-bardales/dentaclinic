import { GetBillUseCase } from "@/features/bill/domain/use-cases/get-all-bills-use-case";
import { cache } from "@/lib/utils/cache";
import { BILLCACHEKEYS } from "../cache-keys/bills-cache-keys";

export const getCachedBills = cache(
  async () => {
    const useCase = new GetBillUseCase();

    const bills = await useCase.execute();

    return bills;
  },
  [BILLCACHEKEYS.BILLS.key],
  {
    revalidate: BILLCACHEKEYS.BILLS.revalidate,
    tags: BILLCACHEKEYS.BILLS.tags,
  }
);
