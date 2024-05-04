import { db } from "@/lib/db/db";

export const getModulePermissionByName = async (payload: { moduleId: number; permissionName: string }) => {
  const found = db.modulePermission.findFirst({
    where: {
      moduleId: payload.moduleId,
      name: payload.permissionName,
    },
  });

  return found;
};
