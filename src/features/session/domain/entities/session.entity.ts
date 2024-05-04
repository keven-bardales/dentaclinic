import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { UserEntity } from "@/features/user/domain/entities/user.entity";

export class SessionEntity {
  constructor(
    public id: string,
    public sessionToken: string,
    public userId: string,
    public expires: DateWrapper,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public user: UserEntity | null = null
  ) {}

  static create(obj: any) {
    return new SessionEntity(
      obj.id,
      obj.sessionToken,
      obj.userId,
      new DateWrapper(obj.expires),
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt)
    );
  }
}
