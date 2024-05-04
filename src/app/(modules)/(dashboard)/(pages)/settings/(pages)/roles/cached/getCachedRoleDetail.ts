import { cache } from "@/lib/utils/cache";
import { ROLESCACHEKEYS } from "../cache-keys/roles.cache.keys";
import { GetRoleByIdWithUsersAndPermissionsUseCase } from "@/features/role/domain/use-cases/getRoleById.use-case";

export const getCachedRoleDetail = async (roleId: number) => {
  const cached = cache(
    async () => {
      const useCase = new GetRoleByIdWithUsersAndPermissionsUseCase();

      const rol = await useCase.execute(roleId);

      return rol;
    },
    [ROLESCACHEKEYS.ROLEDETAIL.key, roleId.toString()],
    {
      revalidate: ROLESCACHEKEYS.ROLEDETAIL.revalidate,
      tags: ROLESCACHEKEYS.ROLEDETAIL.tags,
    }
  );

  return cached();
};
