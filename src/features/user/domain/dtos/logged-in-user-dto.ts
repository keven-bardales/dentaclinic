import { SessionEntity } from "@/features/session/domain/entities/session.entity";
import { UserEntity } from "../entities/user.entity";
import { UserPermissionDto } from "./user-permissions.dto";

export class LoggedInUserDto {
  constructor(
    public id: UserEntity["id"],
    public email: UserEntity["email"],
    public name: UserEntity["name"],
    public emailVerified: UserEntity["emailVerified"],
    public image: UserEntity["image"],
    public createdAt: UserEntity["createdAt"],
    public updatedAt: UserEntity["updatedAt"],
    public userRoles: UserEntity["userRoles"],
    public permissions: UserPermissionDto[],
    public session: SessionEntity
  ) {}

  static create(user: UserEntity, session: SessionEntity) {
    const permissions: UserPermissionDto[] = [];

    if (user?.userRoles && user.userRoles.some((userRole) => userRole.role)) {
      user.userRoles.forEach((userRole) => {
        if (!userRole?.role) {
          return;
        } else {
          userRole.role.rolePermissions.forEach((rolePermission) => {
            if (!rolePermission?.modulePermission) {
              return;
            }
            permissions.push(UserPermissionDto.create(rolePermission.modulePermission));
          });
        }
      });
    }

    return new LoggedInUserDto(
      user.id,
      user.email,
      user.name,
      user.emailVerified,
      user.image,
      user.createdAt,
      user.updatedAt,
      user.userRoles,
      permissions,
      session
    );
  }

  toObject() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      emailVerified: this.emailVerified.toObject(),
      image: this.image,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      userRoles: this.userRoles ? this.userRoles.map((userRole) => userRole.toObject()) : null,
      permissions: this.permissions ? this.permissions.map((permission) => permission.toObject()) : null,
      session: this.session.toObject(),
    };
  }
}
