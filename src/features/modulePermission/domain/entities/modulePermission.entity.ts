import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { ModuleEntity } from "@/features/module/domain/entities/module.entity";
import { RolePermissionEntity } from "@/features/rolePermission/domain/entities/rolePermission.entity";

export class ModulePermissionEntity extends BaseEntity {
  static tableName = "modulePermission";

  constructor(
    public id: number,
    public name: string,
    public moduleId: number,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public module?: ModuleEntity | null,
    public rolePermissions?: RolePermissionEntity[]
  ) {
    super(id, createdAt, updatedAt, ModulePermissionEntity.tableName);
    this.name = name;
    this.moduleId = moduleId;
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
