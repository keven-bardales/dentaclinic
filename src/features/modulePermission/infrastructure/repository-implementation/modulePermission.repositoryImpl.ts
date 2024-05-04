import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { ModulePermissionEntity } from "../../domain/entities/modulePermission.entity";
import { ModulePermissionSourceImpl } from "../datasource-implementations/modulePermission.datasourceImpl";

export class ModulePermissionRepositoryImpl extends BaseRepositoryImpl<ModulePermissionEntity> {
  constructor() {
    super(new ModulePermissionSourceImpl());
  }

  async getAllPermissionsWithModule(): Promise<ModulePermissionEntity[] | null> {
    const permissions = await (this.dataSource as ModulePermissionSourceImpl).getAllPermissionsWithModule();

    if (!permissions) {
      return null;
    }

    return permissions;
  }

  async checkIfPermissionsExists(permissionsId: number[]): Promise<boolean> {
    const result = await (this.dataSource as ModulePermissionSourceImpl).checkIfPermissionsExists(permissionsId);

    return result;
  }
}
