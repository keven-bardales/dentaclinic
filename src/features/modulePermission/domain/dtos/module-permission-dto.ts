import { ModulePermissionEntity } from "../entities/modulePermission.entity";

export class ModulePermissionDto {
  constructor(public id: ModulePermissionEntity["id"], public name: ModulePermissionEntity["name"], public createdAt: string) {}

  static create(module: ModulePermissionEntity) {
    return new ModulePermissionDto(module.id, module.name, module.createdAt.toString);
  }
}
