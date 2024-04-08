import { db } from "@/lib/db/db";
import { UserEntity } from "../../domain/entities/user.entity";
import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { RegisterUserPayload } from "../../domain/interfaces/register-user.interface";

export class UserDataSourceImpl extends BaseDataSourceImpl<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async registerUser(user: RegisterUserPayload): Promise<UserEntity> {
    const result = await db.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });

    return UserEntity.create(result);
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    const result = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!result) {
      return null;
    }

    return UserEntity.create(result);
  }
}
