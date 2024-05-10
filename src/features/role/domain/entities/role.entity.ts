import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { RolePermissionEntity } from "@/features/rolePermission/domain/entities/rolePermission.entity";
import { UserRoleEntity } from "@/features/userRoles/domain/entities/userRole.entity";

export class RoleEntity extends BaseEntity {
  constructor(
    public id: number,
    public name: string,
    public description: string | null,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public rolePermissions: RolePermissionEntity[],
    public userRoles: UserRoleEntity[]
  ) {
    super(id, createdAt, updatedAt, "roles");
    this.name = name;
    this.description = description;
    this.rolePermissions = rolePermissions;
    this.userRoles = userRoles;
  }

  static create(obj: any) {
    return new RoleEntity(
      obj.id,
      obj.name,
      obj.description,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.rolePermissions ? obj.rolePermissions.map((rolePermission: any) => RolePermissionEntity.create(rolePermission)) : [],
      obj.userRoles ? obj.userRoles.map((userRole: any) => UserRoleEntity.create(userRole)) : []
    );
  }

  toObject(): any {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      rolePermissions: this.rolePermissions.map((rolePermission) => rolePermission.toObject()),
      userRoles: this.userRoles.map((userRole) => userRole.toObject()),
    };
  }
}
