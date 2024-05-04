import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { db } from "@/lib/db/db";
import { ModulePermissionEntity } from "../../domain/entities/modulePermission.entity";

export class ModulePermissionSourceImpl extends BaseDataSourceImpl<ModulePermissionEntity> {
  constructor() {
    super(ModulePermissionEntity);
  }

  async getAllPermissionsWithModule(): Promise<ModulePermissionEntity[] | null> {
    const permissions = await db.modulePermission.findMany({
      include: {
        module: true,
      },
    });

    if (!permissions) {
      return null;
    }

    const created = permissions.map((permission) => {
      return ModulePermissionEntity.create(permission);
    });

    return created;
  }

  async checkIfPermissionsExists(permissionsId: number[]): Promise<boolean> {
    const permissions = await db.modulePermission.findMany({
      where: {
        id: {
          in: permissionsId,
        },
      },
    });

    return permissions.length === permissionsId.length;
  }
}
