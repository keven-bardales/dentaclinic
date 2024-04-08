import { AccountEntity } from "@/features/account/domain/entities/account.entity";
import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { SessionEntity } from "@/features/session/domain/entities/session.entity";
import { UserRoleEntity } from "@/features/userRoles/domain/entities/userRole.entity";

export class UserEntity extends BaseEntity {
  static tableName = "user";

  constructor(
    public id: string,
    public name: string,
    public email: string,
    public emailVerified: DateWrapper,
    public image: string,
    public password: string,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public accounts?: AccountEntity[],
    public sessions?: SessionEntity[],
    public userRoles?: UserRoleEntity[]
  ) {
    super(id, createdAt, updatedAt, UserEntity.tableName);

    this.name = name;
    this.email = email;
    this.emailVerified = emailVerified;
    this.image = image;
    this.password = password;
    this.accounts = accounts;
    this.sessions = sessions;
    this.userRoles = userRoles;
  }

  static create(obj: any) {
    return new UserEntity(
      obj.id,
      obj.name,
      obj.email,
      DateWrapper.fromString(obj.emailVerified),
      obj.image,
      obj.password,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.accounts ? obj.accounts.map((account: any) => AccountEntity.create(account)) : [],
      obj.sessions ? obj.sessions.map((session: any) => SessionEntity.create(session)) : [],
      obj.userRoles ? obj.userRoles.map((userRole: any) => UserRoleEntity.create(userRole)) : []
    );
  }
}
