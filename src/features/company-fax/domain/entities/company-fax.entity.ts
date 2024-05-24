import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { CompanyEntity } from "@/features/company/domain/entities/company.entitity";
import { FaxEntity } from "@/features/fax/domain/entities/fax.entity";
import { PhoneStatusEnum } from "@/features/phone/domain/enums/phone-status.entity";

export class CompanyFaxEntity extends BaseEntity {
  static tableName = "company_faxes";

  constructor(
    public id: number,
    public companyId: number,
    public faxId: number,
    public status: PhoneStatusEnum,
    public isMainFax: boolean,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public company: CompanyEntity,
    public fax: FaxEntity
  ) {
    super(id, createdAt, updatedAt, CompanyFaxEntity.tableName);

    this.companyId = companyId;
    this.faxId = faxId;
    this.status = status;
    this.isMainFax = isMainFax;
    this.company = company;
    this.fax = fax;
  }

  static create(obj: any) {
    return new CompanyFaxEntity(
      obj.id,
      obj.companyId,
      obj.faxId,
      obj.status,
      obj.isMainFax,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.company,
      obj.fax
    );
  }

  toObject(): any {
    return {
      id: this.id,
      companyId: this.companyId,
      faxId: this.faxId,
      status: this.status,
      isMainFax: this.isMainFax,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      company: this.company.toObject(),
      fax: this.fax.toObject(),
    };
  }
}
