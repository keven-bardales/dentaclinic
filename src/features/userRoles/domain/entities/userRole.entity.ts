import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { RoleEntity } from "@/features/role/domain/entities/role.entity";
import { UserEntity } from "@/features/user/domain/entities/user.entity";

export class UserRoleEntity {
  constructor(
    public id: number,
    public userId: number,
    public roleId: number,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public user?: UserEntity | null,
    public role?: RoleEntity | null
  ) {
    this.id = id;
    this.userId = userId;
    this.roleId = roleId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
    this.role = role;
  }

  static create(obj: any) {
    return new UserRoleEntity(
      obj.id,
      obj.userId,
      obj.roleId,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.user ? UserEntity.create(obj.user) : null,
      obj.role ? RoleEntity.create(obj.role) : null
    );
  }

  toObject(): any {
    return {
      id: this.id,
      userId: this.userId,
      roleId: this.roleId,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      user: this.user ? this.user.toObject() : null,
      role: this.role ? this.role.toObject() : null,
    };
  }
}
