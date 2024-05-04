import { UserRoleEntity } from "../entities/userRole.entity";

export class UserRolForUserListDto {
  constructor(public id: UserRoleEntity["id"], public role: UserRoleEntity["role"]) {}

  create = (obj: UserRoleEntity) => {
    return new UserRolForUserListDto(obj.id, obj.role);
  };
}
