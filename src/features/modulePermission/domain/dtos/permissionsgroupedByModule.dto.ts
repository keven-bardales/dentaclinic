import { ModuleEntity } from "@/features/module/domain/entities/module.entity";
import { ModulePermissionDto } from "./module-permission-dto";
import { ModulePermissionEntity } from "../entities/modulePermission.entity";

export class PermissionsGroupedByModuleDto {
  constructor(public moduleId: ModuleEntity["id"], public moduleName: ModuleEntity["name"], public permissions: ModulePermissionDto[]) {}

  static create(module: ModuleEntity, modulePermission: ModulePermissionEntity[]) {
    const permissions = modulePermission
      .filter((permission) => permission.moduleId === module.id)
      .map((permission) => ModulePermissionDto.create(permission));

    return new PermissionsGroupedByModuleDto(
      module.id,
      module?.name,

      permissions
    );
  }
}
