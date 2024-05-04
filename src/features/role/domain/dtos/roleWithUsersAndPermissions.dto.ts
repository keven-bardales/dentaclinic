import { UserForRoleDetailDto } from "@/features/user/domain/dtos/for-role-detail-user.dto";
import { RoleEntity } from "../entities/role.entity";
import { UserEntity } from "@/features/user/domain/entities/user.entity";

export class RoleWithUsersAndPermissionsIdsDto {
  constructor(
    public id: RoleEntity["id"],
    public name: RoleEntity["name"],
    public description: RoleEntity["description"],
    public users: UserForRoleDetailDto[],
    public permissionsIds: number[]
  ) {}

  static create(obj: RoleEntity) {
    return new RoleWithUsersAndPermissionsIdsDto(
      obj.id,
      obj.name,
      obj?.description,
      obj?.userRoles?.map((userRole) => UserForRoleDetailDto.create(userRole?.user as UserEntity)) || [],
      obj?.rolePermissions?.map((rolePermission) => rolePermission.modulePermissionId) || []
    );
  }
}
