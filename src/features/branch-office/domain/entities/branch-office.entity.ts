import { AddressEntity } from "@/features/address/domain/entities/address.entity";
import { BillEntity } from "@/features/bill/domain/entities/bill-entity";
import { BranchOfficeFaxEntity } from "@/features/branch-office-fax/domain/entities/branch-office-fax.entity";
import { BranchOfficePhoneEntity } from "@/features/branch-office-phone/domain/entities/branch-office-phone.entity";
import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { CompanyEntity } from "@/features/company/domain/entities/company.entitity";
import { EmployeeBranchOfficeEntity } from "@/features/employee-branch-office/domain/entities/employee-branch-office.entity";
import { QuotationEntity } from "@/features/quotation/domain/entities/quotation.entity";
import { UserBranchOfficeEntity } from "@/features/user-branch-office/domain/entity/user-branch-office.entity";
import { WarehouseEntity } from "@/features/warehouse/domain/entities/warehouse.entity";

export class BranchOfficeEntity extends BaseEntity {
  static tableName = "branchOffice";

  constructor(
    public id: number,
    public name: string,
    public adressId: number,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public address: AddressEntity,
    public warehouses: WarehouseEntity[],
    public bills: BillEntity[],
    public quotations: QuotationEntity[],
    public employeeBranchOffice: EmployeeBranchOfficeEntity[],
    public userBranchOffice: UserBranchOfficeEntity[],
    public branchOfficePhones: BranchOfficePhoneEntity[],
    public branchOfficeFaxes: BranchOfficeFaxEntity[],
    public companyId: number,
    public company: CompanyEntity
  ) {
    super(id, createdAt, updatedAt, BranchOfficeEntity.tableName);

    this.name = name;
    this.adressId = adressId;
    this.address = address;
    this.warehouses = warehouses;
    this.bills = bills;
    this.quotations = quotations;
    this.employeeBranchOffice = employeeBranchOffice;
    this.userBranchOffice = userBranchOffice;
    this.branchOfficePhones = branchOfficePhones;
    this.branchOfficeFaxes = branchOfficeFaxes;
    this.companyId = companyId;
    this.company = company;
  }

  static create(obj: any) {
    return new BranchOfficeEntity(
      obj.id,
      obj.name,
      obj.adressId,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      AddressEntity.create(obj.address),
      obj.warehouses,
      obj.bills,
      obj.quotations,
      obj.employeeBranchOffice,
      obj.userBranchOffice,
      obj.branchOfficePhones,
      obj.branchOfficeFaxes,
      obj.companyId,
      obj.Company
    );
  }

  toObject(): any {
    return {
      id: this.id,
      name: this.name,
      adressId: this.adressId,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      address: this.address.toObject(),
      warehouses: this.warehouses.map((warehouse) => warehouse.toObject()),
      bills: this.bills.map((bill) => bill.toObject()),
      quotations: this.quotations.map((quotation) => quotation.toObject()),
      employeeBranchOffice: this.employeeBranchOffice.map((employeeBranchOffice) => employeeBranchOffice.toObject()),
      userBranchOffice: this.userBranchOffice.map((userBranchOffice) => userBranchOffice.toObject()),
      branchOfficePhones: this.branchOfficePhones.map((branchOfficePhone) => branchOfficePhone.toObject()),
      branchOfficeFaxes: this.branchOfficeFaxes.map((branchOfficeFax) => branchOfficeFax.toObject()),
      companyId: this.companyId,
      company: this.company.toObject(),
    };
  }
}
