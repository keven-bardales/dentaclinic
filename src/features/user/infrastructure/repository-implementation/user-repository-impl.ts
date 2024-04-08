import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserDataSourceImpl } from "../datasource-implementations/user-datasource-impl";
import { RegisterUserPayload } from "../../domain/interfaces/register-user.interface";

export class UserRepositoryImpl extends BaseRepositoryImpl<UserEntity> {
  constructor() {
    super(new UserDataSourceImpl());
  }

  registerUser(user: RegisterUserPayload): Promise<UserEntity> {
    return (this.dataSource as UserDataSourceImpl).registerUser(user);
  }

  getUserByEmail(email: string): Promise<UserEntity | null> {
    return (this.dataSource as UserDataSourceImpl).getUserByEmail(email);
  }
}