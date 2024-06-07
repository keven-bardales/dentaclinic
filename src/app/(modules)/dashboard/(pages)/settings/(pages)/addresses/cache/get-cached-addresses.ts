import { GetAddressUseCase } from "@/features/address/domain/use-cases/get-all-addresses-use-case";
import { cache } from "@/lib/utils/cache";
import { ADDRESSCACHEKEYS } from "../cache-keys/addresses-cache-keys";

export const getCachedAddresses = cache(
  async () => {
    const useCase = new GetAddressUseCase();

    const addresses = await useCase.execute();

    return addresses;
  },
  [ADDRESSCACHEKEYS.ADDRESSES.key],
  {
    revalidate: ADDRESSCACHEKEYS.ADDRESSES.revalidate,
    tags: ADDRESSCACHEKEYS.ADDRESSES.tags,
  }
);
