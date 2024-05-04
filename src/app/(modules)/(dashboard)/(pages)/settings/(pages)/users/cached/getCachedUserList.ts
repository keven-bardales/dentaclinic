import { GetUserListUseCase } from "@/features/user/domain/use-cases/get-users-list.use-case";
import { USERSCACHEKEYS } from "../cache-keys/users-cache.keys";
import { cache } from "@/lib/utils/cache";

export const getCachedUserListWithRoleCount = cache(
  async () => {
    const useCase = new GetUserListUseCase();

    const users = await useCase.execute();

    return users;
  },

  [USERSCACHEKEYS.USERS.key],
  {
    revalidate: USERSCACHEKEYS.USERS.revalidate,
    tags: USERSCACHEKEYS.USERS.tags,
  }
);
