import { UserEntity } from "../entities/user.entity";

export class UserForRoleDetailDto {
  constructor(public id: string, public name: string, public email: string) {}

  static create(obj: UserEntity) {
    return new UserForRoleDetailDto(obj.id, obj.name, obj.email);
  }
}
