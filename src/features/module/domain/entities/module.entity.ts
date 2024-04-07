import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { ModulePermissionEntity } from "@/features/modulePermission/domain/entities/modulePermission.entity";

export class ModuleEntity {
  constructor(
    public id: number,
    public name: string,
    public description: string | null,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public modulePermissions?: ModulePermissionEntity[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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
