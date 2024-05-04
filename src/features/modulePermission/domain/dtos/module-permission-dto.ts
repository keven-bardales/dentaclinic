import { ModulePermissionEntity } from "../entities/modulePermission.entity";

export class ModulePermissionDto {
  constructor(
    public id: ModulePermissionEntity["id"],
    public name: ModulePermissionEntity["name"],
    public createdAt: string,
    public moduleId: ModulePermissionEntity["moduleId"]
  ) {}

  static create(modulePermission: ModulePermissionEntity) {
    return new ModulePermissionDto(modulePermission.id, modulePermission.name, modulePermission.createdAt.toString, modulePermission.moduleId);
  }
}
