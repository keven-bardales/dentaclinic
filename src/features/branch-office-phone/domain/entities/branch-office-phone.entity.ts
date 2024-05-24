import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { BranchOfficeEntity } from "@/features/branch-office/domain/entities/branch-office.entity";
import { PhoneEntity } from "@/features/phone/domain/entities/phone.entity";
import { PhoneStatus } from "@prisma/client";

export class BranchOfficePhoneEntity extends BaseEntity {
  static tableName = "branch_office_phones";

  constructor(
    public id: number,
    public branchOfficeId: number,
    public phoneId: bigint,
    public status: PhoneStatus,
    public isMainPhone: boolean,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public branchOffice: BranchOfficeEntity,
    public phone: PhoneEntity
  ) {
    super(id, createdAt, updatedAt, BranchOfficePhoneEntity.tableName);

    this.branchOfficeId = branchOfficeId;
    this.phoneId = phoneId;
    this.status = status;
    this.isMainPhone = isMainPhone;
    this.branchOffice = branchOffice;
    this.phone = phone;
  }

  static create(obj: any) {
    return new BranchOfficePhoneEntity(
      obj.id,
      obj.branchOfficeId,
      obj.phoneId,
      obj.status,
      obj.isMainPhone,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.branchOffice,
      obj.phone
    );
  }

  toObject(): any {
    return {
      id: this.id,
      branchOfficeId: this.branchOfficeId,
      phoneId: this.phoneId,
      status: this.status,
      isMainPhone: this.isMainPhone,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      branchOffice: this.branchOffice.toObject(),
      phone: this.phone.toObject(),
    };
  }
}
