import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { BranchOfficeEntity } from "@/features/branch-office/domain/entities/branch-office.entity";
import { FaxEntity } from "@/features/fax/domain/entities/fax.entity";
import { PhoneStatus } from "@prisma/client";

export class BranchOfficeFaxEntity extends BaseEntity {
  static tableName = "branch_office_faxes";

  constructor(
    public id: number,
    public branchOfficeId: number,
    public faxId: number,
    public status: PhoneStatus,
    public isMainFax: boolean,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public branchOffice: BranchOfficeEntity,
    public fax: FaxEntity
  ) {
    super(id, createdAt, updatedAt, BranchOfficeFaxEntity.tableName);

    this.branchOfficeId = branchOfficeId;
    this.faxId = faxId;
    this.status = status;
    this.isMainFax = isMainFax;
    this.branchOffice = branchOffice;
    this.fax = fax;
  }

  static create(obj: any) {
    return new BranchOfficeFaxEntity(
      obj.id,
      obj.branchOfficeId,
      obj.faxId,
      obj.status,
      obj.isMainFax,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.branchOffice,
      obj.fax
    );
  }

  toObject(): any {
    return {
      id: this.id,
      branchOfficeId: this.branchOfficeId,
      faxId: this.faxId,
      status: this.status,
      isMainFax: this.isMainFax,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      branchOffice: this.branchOffice.toObject(),
      fax: this.fax.toObject(),
    };
  }
}
