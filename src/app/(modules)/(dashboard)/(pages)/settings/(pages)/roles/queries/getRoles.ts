import { db } from "@/lib/db/db";

export const getRoles = async () => {
  const roles = await db.role.findMany({
    include: {
      rolePermissions: {
        include: {
          modulePermission: {
            include: {
              module: true,
            },
          },
        },
      },
    },
  });

  const mappedRoles = roles.map((role) => ({
    ...role,
    rolePermissions: role.rolePermissions.map((rolePermission) => {
      return {
        name: rolePermission.modulePermission.name,
        module: rolePermission.modulePermission.module.name,
      };
    }),
  }));

  return mappedRoles;
};
