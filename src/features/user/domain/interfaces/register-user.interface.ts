import { UserEntity } from "../entities/user.entity";

export interface RegisterUserPayload {
  email: UserEntity["email"];
  password: UserEntity["password"];
  name: UserEntity["name"];
}
