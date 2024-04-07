import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { RolePermissionEntity } from "@/features/rolePermission/domain/entities/rolePermission.entity";
import { UserRoleEntity } from "@/features/userRoles/domain/entities/userRole.entity";

export class RoleEntity {
  constructor(
    public id: number,
    public name: string,
    public description: string | null,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public rolePermissions: RolePermissionEntity[],
    public userRoles: UserRoleEntity[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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
}
