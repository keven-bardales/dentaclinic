import { RoleEntity } from "../entities/role.entity";

export class RoleWithUsersPermissionsCountDto {
  constructor(
    public id: RoleEntity["id"],
    public name: RoleEntity["name"],
    public description: RoleEntity["description"],
    public usersCount: number,
    public permissionsCount: number
  ) {}

  static create(obj: RoleEntity) {
    return new RoleWithUsersPermissionsCountDto(obj.id, obj.name, obj?.description, obj.userRoles?.length ?? 0, obj.rolePermissions?.length ?? 0);
  }
}
