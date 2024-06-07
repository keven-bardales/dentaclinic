import { GetNeighborhoodUseCase } from "@/features/neighborhood/domain/use-cases/get-all-neighborhoods.use-case";
import { cache } from "@/lib/utils/cache";
import { NEIGHBORHOODCACHEKEYS } from "../cache-keys/neighborhoods-cache-keys";

export const getCachedNeighborhoods = cache(
  async () => {
    const useCase = new GetNeighborhoodUseCase();

    const neighborhoods = await useCase.execute();

    return neighborhoods;
  },
  [NEIGHBORHOODCACHEKEYS.NEIGHBORHOODS.key],
  {
    revalidate: NEIGHBORHOODCACHEKEYS.NEIGHBORHOODS.revalidate,
    tags: NEIGHBORHOODCACHEKEYS.NEIGHBORHOODS.tags,
  }
);
