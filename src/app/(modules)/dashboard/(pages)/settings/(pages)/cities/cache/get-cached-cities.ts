import { GetCityUseCase } from "@/features/city/domain/use-cases/get-all-cities-use-case";
import { cache } from "@/lib/utils/cache";
import { CITYCACHEKEYS } from "../cache-keys/cities-cache-keys";

export const getCachedCities = cache(
  async () => {
    const useCase = new GetCityUseCase();

    const cities = await useCase.execute();

    return cities;
  },
  [CITYCACHEKEYS.CITIES.key],
  {
    revalidate: CITYCACHEKEYS.CITIES.revalidate,
    tags: CITYCACHEKEYS.CITIES.tags,
  }
);
