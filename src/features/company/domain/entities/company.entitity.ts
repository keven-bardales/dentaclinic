import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { BranchOfficeEntity } from "@/features/branch-office/domain/entities/branch-office.entity";
import { CompanyPhoneEntity } from "@/features/company-phone/domain/entities/company-phone.entity";
import { CompanyFaxEntity } from "@/features/company-fax/domain/entities/company-fax.entity";

export class CompanyEntity extends BaseEntity {
  static tableName = "company";

  constructor(
    public id: number,
    public name: string,
    public acronym: string,
    public rtn: string,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public branches: BranchOfficeEntity[],
    public companyFaxes: CompanyFaxEntity[],
    public companyPhones: CompanyPhoneEntity[]
  ) {
    super(id, createdAt, updatedAt, CompanyEntity.tableName);

    this.name = name;
    this.acronym = acronym;
    this.rtn = rtn;
    this.branches = branches;
    this.companyFaxes = companyFaxes;
    this.companyPhones = companyPhones;
  }

  static create(obj: any) {
    return new CompanyEntity(
      obj.id,
      obj.name,
      obj.acronym,
      obj.rtn,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.branches,
      obj.CompanyFaxes,
      obj.CompanyPhones
    );
  }

  toObject(): any {
    return {
      id: this.id,
      name: this.name,
      acronym: this.acronym,
      rtn: this.rtn,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      branches: this.branches.map((branch) => branch.toObject()),
      companyFaxes: this.companyFaxes.map((fax) => fax.toObject()),
      companyPhones: this.companyPhones.map((phone) => phone.toObject()),
    };
  }
}
