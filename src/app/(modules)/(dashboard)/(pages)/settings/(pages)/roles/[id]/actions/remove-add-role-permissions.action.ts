"use server";

import { RemoveOrAddPermissionUseCase } from "@/features/role/domain/use-cases/remove-add-permission.use-case";
import { revalidateTag } from "next/cache";
import { ROLESCACHEKEYS } from "../../cache-keys/roles.cache.keys";

export async function removeOrAddRolePermissionsAction(roleId: number, permissionsId: number[], action: "add" | "remove") {
  const useCase = new RemoveOrAddPermissionUseCase();

  const result = await useCase.execute(roleId, permissionsId, action);

  revalidateTag(ROLESCACHEKEYS.ROLEDETAIL.key);
  revalidateTag(ROLESCACHEKEYS.ROLES.key);

  return JSON.stringify(result);
}
