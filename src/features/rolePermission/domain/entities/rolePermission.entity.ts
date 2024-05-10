import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { ModulePermissionEntity } from "@/features/modulePermission/domain/entities/modulePermission.entity";
import { RoleEntity } from "@/features/role/domain/entities/role.entity";

export class RolePermissionEntity {
  constructor(
    public id: number,
    public rolId: number,
    public modulePermissionId: number,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public role: RoleEntity | null,
    public modulePermission: ModulePermissionEntity | null
  ) {
    this.id = id;
    this.rolId = rolId;
    this.modulePermissionId = modulePermissionId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.role = role;
    this.modulePermission = modulePermission;
  }

  static create(obj: any) {
    return new RolePermissionEntity(
      obj.id,
      obj.rolId,
      obj.modulePermissionId,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.role ? RoleEntity.create(obj.role) : null,
      obj.modulePermission ? ModulePermissionEntity.create(obj.modulePermission) : null
    );
  }

  toObject() {
    return {
      id: this.id,
      rolId: this.rolId,
      modulePermissionId: this.modulePermissionId,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      role: this.role ? this.role.toObject() : null,
      modulePermission: this.modulePermission ? this.modulePermission.toObject() : null,
    };
  }
}
