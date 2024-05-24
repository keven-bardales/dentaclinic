import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { CompanyEntity } from "@/features/company/domain/entities/company.entitity";
import { PhoneEntity } from "@/features/phone/domain/entities/phone.entity";
import { PhoneStatusEnum } from "@/features/phone/domain/enums/phone-status.entity";

export class CompanyPhoneEntity extends BaseEntity {
  static tableName = "company_phones";

  constructor(
    public id: number,
    public companyId: number,
    public phoneId: bigint,
    public status: PhoneStatusEnum,
    public isMainPhone: boolean,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public company: CompanyEntity,
    public phone: PhoneEntity
  ) {
    super(id, createdAt, updatedAt, CompanyPhoneEntity.tableName);

    this.companyId = companyId;
    this.phoneId = phoneId;
    this.status = status;
    this.isMainPhone = isMainPhone;
    this.company = company;
    this.phone = phone;
  }

  static create(obj: any) {
    return new CompanyPhoneEntity(
      obj.id,
      obj.companyId,
      obj.phoneId,
      obj.status,
      obj.isMainPhone,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.company,
      obj.phone
    );
  }

  toObject(): any {
    return {
      id: this.id,
      companyId: this.companyId,
      phoneId: this.phoneId,
      status: this.status,
      isMainPhone: this.isMainPhone,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      company: this.company.toObject(),
      phone: this.phone.toObject(),
    };
  }
}
