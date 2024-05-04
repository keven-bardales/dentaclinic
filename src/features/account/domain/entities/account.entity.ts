import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { UserEntity } from "@/features/user/domain/entities/user.entity";

export class AccountEntity {
  constructor(
    public id: string,
    public userId: string,
    public type: string,
    public provider: string,
    public providerAccountId: string,
    public refreshToken: string | null,
    public accessToken: string | null,
    public expiresAt: number | null,
    public tokenType: string | null,
    public scope: string | null,
    public idToken: string | null,
    public sessionState: string | null,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public user: UserEntity | null = null
  ) {}

  static create(obj: any) {
    return new AccountEntity(
      obj.id,
      obj.userId,
      obj.type,
      obj.provider,
      obj.providerAccountId,
      obj.refresh_token,
      obj.access_token,
      obj.expires_at,
      obj.token_type,
      obj.scope,
      obj.id_token,
      obj.session_state,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt)
    );
  }
}
