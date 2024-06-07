import { GetBranchOfficeUseCase } from "@/features/branch-office/domain/use-cases/get-all-branch-office.use-case";
import { cache } from "@/lib/utils/cache";
import { BRANCHOFFICECACHEKEYS } from "../cache-keys/branch-offices-cache-keys";

export const getCachedBranchOffices = cache(
  async () => {
    const useCase = new GetBranchOfficeUseCase();

    const branchOffices = await useCase.execute();

    return branchOffices;
  },
  [BRANCHOFFICECACHEKEYS.BRANCHOFFICES.key],
  {
    revalidate: BRANCHOFFICECACHEKEYS.BRANCHOFFICES.revalidate,
    tags: BRANCHOFFICECACHEKEYS.BRANCHOFFICES.tags,
  }
);
