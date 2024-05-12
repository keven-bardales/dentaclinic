import { db } from "@/lib/db/db";
import { UserEntity } from "../../domain/entities/user.entity";
import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { RegisterUserPayload } from "../../domain/interfaces/register-user.interface";
import { CreateUserDto } from "../../domain/dtos/create-user.dto";

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
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    modulePermission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!result) {
      return null;
    }

    return UserEntity.create(result);
  }

  async getUsersList(): Promise<UserEntity[]> {
    const result = await db.user.findMany({
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    return result.map((user: any) => UserEntity.create(user));
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    const result = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    modulePermission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!result) {
      return null;
    }

    return UserEntity.create(result);
  }

  async createNewUser(user: CreateUserDto): Promise<UserEntity | null> {
    const result = await db.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        userRoles: {
          createMany: {
            data:
              user?.userRoles?.map((role) => {
                return {
                  roleId: role,
                };
              }) ?? [],
          },
        },
      },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    modulePermission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!result) {
      return null;
    }
    return UserEntity.create(result);
  }
}
