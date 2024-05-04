import { ModulePermissionDto } from "@/features/modulePermission/domain/dtos/module-permission-dto";
import { ModuleEntity } from "../entities/module.entity";

export class ModuleWithPermissionsDto {
  constructor(
    public id: ModuleEntity["id"],
    public name: ModuleEntity["name"],
    public description: ModuleEntity["description"],
    public modulePermissions: ModulePermissionDto[]
  ) {}

  static create(module: ModuleEntity): ModuleWithPermissionsDto {
    return new ModuleWithPermissionsDto(
      module.id,
      module.name,
      module.description,
      module.modulePermissions.map((modulePermission) => ModulePermissionDto.create(modulePermission))
    );
  }
}
