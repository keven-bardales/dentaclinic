import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { UserEntity } from "@/features/user/domain/entities/user.entity";
import { db } from "@/lib/db/db";

export class SessionEntity extends BaseEntity {
  constructor(
    public id: string,
    public sessionToken: string,
    public rememberUser: boolean,
    public userId: string,
    public expires: DateWrapper,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public user: UserEntity | null = null
  ) {
    super(id, createdAt, updatedAt, "session");
  }

  static create(obj: any) {
    return new SessionEntity(
      obj.id,
      obj.sessionToken,
      obj.rememberUser,
      obj.userId,
      new DateWrapper(obj.expires),
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt)
    );
  }

  toObject(): any {
    return {
      id: this.id,
      sessionToken: this.sessionToken,
      userId: this.userId,
      expires: this.expires.toObject(),
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      user: this.user ? this.user.toObject() : null,
    };
  }
}
