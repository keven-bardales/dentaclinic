import { cache } from "@/lib/utils/cache";
import { CUSTOMERSCACHEKEYS } from "../cache-keys/customers-cache-keys";
import { GetCustomerListUseCase } from "@/features/customer/domain/use-cases/get-all-customers-use-case";

export const getCachedCustomers = cache(
  async () => {
    const useCase = new GetCustomerListUseCase();

    const customers = await useCase.execute();

    return customers;
  },
  [CUSTOMERSCACHEKEYS.CUSTOMERS.key],
  {
    revalidate: CUSTOMERSCACHEKEYS.CUSTOMERS.revalidate,
    tags: CUSTOMERSCACHEKEYS.CUSTOMERS.tags,
  }
);
