import { cache } from "@/lib/utils/cache";
import { STATECACHEKEYS } from "../cache-keys/state-cache-keys";
import { GetStateUseCase } from "@/features/state/domain/use-cases/get-all-states.use-case";

export const getCachedStates = cache(
  async () => {
    const useCase = new GetStateUseCase();

    const states = await useCase.execute();

    return states;
  },
  [STATECACHEKEYS.STATES.key],
  {
    revalidate: STATECACHEKEYS.STATES.revalidate,
    tags: STATECACHEKEYS.STATES.tags,
  }
);
