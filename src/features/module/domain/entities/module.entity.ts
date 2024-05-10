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
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.modulePermissions ? obj.modulePermissions.map((modulePermission: any) => ModulePermissionEntity.create(modulePermission)) : []
    );
  }

  toObject(): any {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      modulePermissions: this.modulePermissions.map((modulePermission) => modulePermission.toObject()),
    };
  }
}
