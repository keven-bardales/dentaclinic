import { cache } from "@/lib/utils/cache";
import { ROLESCACHEKEYS } from "../cache-keys/roles.cache.keys";
import { GetAllModulesWithPermissionsUseCase } from "@/features/module/domain/use-cases/get-all-modules-with-permissions-use-case";
import { GetAllRolesUseCase } from "@/features/role/domain/use-cases/getAllRoles.use-case";

export const getCachedRolesWithPermissionsAndUsersCount = cache(
  async () => {
    const useCase = new GetAllRolesUseCase();

    const roles = await useCase.execute();

    return roles;
  },
  [ROLESCACHEKEYS.ROLES.key],
  {
    revalidate: ROLESCACHEKEYS.ROLES.revalidate,
    tags: ROLESCACHEKEYS.ROLES.tags,
  }
);
