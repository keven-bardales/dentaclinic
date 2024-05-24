import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { UserEntity } from "@/features/user/domain/entities/user.entity";
import { BranchOfficeEntity } from "@/features/branch-office/domain/entities/branch-office.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";

export class UserBranchOfficeEntity extends BaseEntity {
  static tableName = "user_branch_office";

  constructor(
    public id: number,
    public userId: string,
    public branchOfficeId: number,
    public isDefault: boolean,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public user: UserEntity,
    public branchOffice: BranchOfficeEntity
  ) {
    super(id, createdAt, updatedAt, UserBranchOfficeEntity.tableName);

    this.userId = userId;
    this.branchOfficeId = branchOfficeId;
    this.isDefault = isDefault;
    this.user = user;
    this.branchOffice = branchOffice;
  }

  static create(obj: any) {
    return new UserBranchOfficeEntity(
      obj.id,
      obj.userId,
      obj.branchOfficeId,
      obj.isDefault,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.user,
      obj.branchOffice
    );
  }

  toObject(): any {
    return {
      id: this.id,
      userId: this.userId,
      branchOfficeId: this.branchOfficeId,
      isDefault: this.isDefault,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      user: this.user.toObject(),
      branchOffice: this.branchOffice.toObject(),
    };
  }
}
