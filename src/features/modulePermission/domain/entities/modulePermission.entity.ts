import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { ModuleEntity } from "@/features/module/domain/entities/module.entity";
import { RolePermissionEntity } from "@/features/rolePermission/domain/entities/rolePermission.entity";

export class ModulePermissionEntity {
  constructor(
    public id: number,
    public name: string,
    public moduleId: number,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public module?: ModuleEntity | null,
    public rolePermissions?: RolePermissionEntity[]
  ) {
    this.id = id;
    this.name = name;
    this.moduleId = moduleId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.module = module;
    this.rolePermissions = rolePermissions;
  }

  static create(obj: any) {
    return new ModulePermissionEntity(
      obj.id,
      obj.name,
      obj.moduleId,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.module ? ModuleEntity.create(obj.module) : null,
      obj.rolePermissions ? obj.rolePermissions.map((rolePermission: any) => RolePermissionEntity.create(rolePermission)) : []
    );
  }
}
