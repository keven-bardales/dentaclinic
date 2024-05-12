import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { UserEntity } from "../entities/user.entity";

export class CreatedUserDto {
  id: string;
  email: string;
  name: string;
  createdAt: DateWrapper;

  constructor(id: string, email: string, name: string, createdAt: DateWrapper) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.createdAt = createdAt;
  }

  static create(user: UserEntity): CreatedUserDto {
    return new CreatedUserDto(user.id, user.email, user.name, user.createdAt);
  }

  toObject() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      createdAt: this.createdAt,
    };
  }
}
