import { UserEntity } from "../entities/user.entity";

export class LoggedInUserDto {
  constructor(
    public id: UserEntity["id"],
    public email: UserEntity["email"],
    public name: UserEntity["name"],
    public emailVerified: UserEntity["emailVerified"],
    public image: UserEntity["image"],
    public createdAt: UserEntity["createdAt"],
    public updatedAt: UserEntity["updatedAt"],
    public userRoles: UserEntity["userRoles"]
  ) {}

  static create(user: UserEntity) {
    return new LoggedInUserDto(user.id, user.email, user.name, user.emailVerified, user.image, user.createdAt, user.updatedAt, user.userRoles);
  }
}
