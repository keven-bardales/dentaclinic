import { db } from "@/lib/db/db";

export const getPermissions = async () => {
  const permissions = await db.modulePermission.findMany({
    include: {
      module: true,
    },
  });

  return permissions;
};
