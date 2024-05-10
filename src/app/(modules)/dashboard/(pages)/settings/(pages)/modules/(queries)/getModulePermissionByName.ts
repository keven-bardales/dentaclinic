import { db } from "@/lib/db/db";

export const getModulePermissionByName = async (payload: { permissionName: string }) => {
  const found = db.modulePermission.findFirst({
    where: {
      name: payload.permissionName,
    },
  });

  return found;
};
