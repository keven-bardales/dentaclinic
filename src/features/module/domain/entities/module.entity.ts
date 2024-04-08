import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { ModulePermissionEntity } from "@/features/modulePermission/domain/entities/modulePermission.entity";

export class ModuleEntity extends BaseEntity {
  static tableName = "module";

  constructor(
    public id: number,
    public name: string,
    public description: string | null,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public modulePermissions: ModulePermissionEntity[]
  ) {
    super(id, createdAt, updatedAt, ModuleEntity.tableName);
    this.name = name;
    this.description = description;
    this.modulePermissions = modulePermissions;
  }

  static create(obj: any) {
    return new ModuleEntity(
      obj.id,
      obj.name,
      obj.description,
      DateWrapper.fromString(obj.createdAt),
      DateWrapper.fromString(obj.updatedAt),
      obj.modulePermissions ? obj.modulePermissions.map((modulePermission: any) => ModulePermissionEntity.create(modulePermission)) : []
    );
  }
}
