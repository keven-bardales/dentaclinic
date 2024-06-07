import { GetCountryUseCase } from "@/features/country/domain/use-cases/get-all-countries-use-case";
import { cache } from "@/lib/utils/cache";
import { COUNTRYCACHEKEYS } from "../cache-keys/countries-cache-keys";

export const getCachedCountries = cache(
  async () => {
    const useCase = new GetCountryUseCase();

    const countries = await useCase.execute();

    return countries;
  },
  [COUNTRYCACHEKEYS.COUNTRIES.key],
  {
    revalidate: COUNTRYCACHEKEYS.COUNTRIES.revalidate,
    tags: COUNTRYCACHEKEYS.COUNTRIES.tags,
  }
);
