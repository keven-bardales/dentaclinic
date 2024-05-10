import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { RoleEntity } from "../../domain/entities/role.entity";
import { db } from "@/lib/db/db";

export class RoleDataSourceImpl extends BaseDataSourceImpl<RoleEntity> {
  constructor() {
    super(RoleEntity);
  }

  async roleExists(roleId: number): Promise<boolean> {
    const role = await db.role.findUnique({
      where: {
        id: roleId,
      },
    });

    return !!role;
  }

  async getAllWithPermissionsAndUsersCount(): Promise<RoleEntity[] | null> {
    const roles = await db.role.findMany({
      include: {
        rolePermissions: true,
        userRoles: true,
      },
    });

    if (!roles) {
      return null;
    }

    const created = roles.map((role) => {
      return RoleEntity.create(role);
    });

    return created;
  }

  async getRoleByIdWithUsersAndPermissions(roleId: number): Promise<RoleEntity | null> {
    const role = await db.role.findUnique({
      where: {
        id: roleId,
      },
      include: {
        rolePermissions: true,
        userRoles: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!role) {
      return null;
    }

    return RoleEntity.create(role);
  }

  async deletePermissionFromRole(roleId: number, permissionsIds: number[]): Promise<boolean> {
    const result = await db.rolePermissions.deleteMany({
      where: {
        rolId: roleId,
        modulePermissionId: {
          in: permissionsIds,
        },
      },
    });

    return !!result;
  }

  async addPermissionToRole(roleId: number, permissionsIds: number[]): Promise<boolean> {
    const result = await db.rolePermissions.createMany({
      data: permissionsIds.map((id) => {
        return {
          modulePermissionId: id,
          rolId: roleId,
        };
      }),
    });

    return !!result;
  }

  async checkRoleIds(roleIds: number[]): Promise<RoleEntity[] | null> {
    const result = await db.role.findMany({
      where: {
        id: {
          in: roleIds,
        },
      },
    });

    if (!result) {
      return null;
    }

    return result.map((role) => RoleEntity.create(role));
  }
}
