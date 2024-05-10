import { cache } from "@/lib/utils/cache";
import { GetAllModulesWithPermissionsUseCase } from "@/features/module/domain/use-cases/get-all-modules-with-permissions-use-case";
import { MODULESCACHEKEYS } from "../(cache-keys)/modules-cache-keys";

export const getCachedModules = cache(
  () => {
    const useCase = new GetAllModulesWithPermissionsUseCase();
    return useCase.execute();
  },
  [MODULESCACHEKEYS.MODULES.key],
  { revalidate: MODULESCACHEKEYS.MODULES.revalidate, tags: MODULESCACHEKEYS.MODULES.tags }
);
