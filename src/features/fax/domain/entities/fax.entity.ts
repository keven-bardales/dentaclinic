import { BranchOfficeFaxEntity } from "@/features/branch-office-fax/domain/entities/branch-office-fax.entity";
import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { CompanyFaxEntity } from "@/features/company-fax/domain/entities/company-fax.entity";
import { PhoneStatusEnum } from "@/features/phone/domain/enums/phone-status.entity";
import { PhoneType } from "@prisma/client";

export class FaxEntity extends BaseEntity {
  static tableName = "fax";

  constructor(
    public id: number,
    public fax: string,
    public status: PhoneStatusEnum,
    public type: PhoneType,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public branchOfficeFaxes: BranchOfficeFaxEntity[],
    public companyFaxes: CompanyFaxEntity[]
  ) {
    super(id, createdAt, updatedAt, FaxEntity.tableName);

    this.fax = fax;
    this.status = status;
    this.type = type;
    this.branchOfficeFaxes = branchOfficeFaxes;
    this.companyFaxes = companyFaxes;
  }

  static create(obj: any) {
    return new FaxEntity(
      obj.id,
      obj.fax,
      obj.status,
      obj.type,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.BranchOfficeFaxes,
      obj.CompanyFaxes
    );
  }

  toObject(): any {
    return {
      id: this.id,
      fax: this.fax,
      status: this.status,
      type: this.type,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      branchOfficeFaxes: this.branchOfficeFaxes.map((fax) => fax.toObject()),
      companyFaxes: this.companyFaxes.map((fax) => fax.toObject()),
    };
  }
}
