import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { UserEntity } from "../entities/user.entity";
import { UserRolForUserListDto } from "@/features/userRoles/domain/dtos/user-rol-for-user-list.dto";

export class UserListDto {
  constructor(
    public id: UserEntity["id"],
    public name: UserEntity["name"],
    public email: UserEntity["email"],
    public image: UserEntity["image"],
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public userRoles?: UserRolForUserListDto[]
  ) {}

  static create(obj: UserEntity) {
    return new UserListDto(
      obj.id,
      obj.name,
      obj.email,
      obj.image,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.userRoles?.map((userRole) => new UserRolForUserListDto(userRole.id, userRole.role)) || []
    );
  }
}
