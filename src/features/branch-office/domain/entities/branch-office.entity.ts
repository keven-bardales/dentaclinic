import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { TypesOfDocuments } from "@/features/common/domain/enums/document-types";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { CustomerEntity } from "@/features/customer/domain/entities/customer.entity";
import { QuotationEntity } from "@/features/quotation/domain/entities/quotation.entity";
import { Prisma } from "@prisma/client";

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
    return new QuotationEntity(
      obj.id,
      new DateWrapper(obj.startDate),
      new DateWrapper(obj.finalDate),
      obj.project,
      obj.code,
      obj.total,
      obj.subTotal,
      obj.tax,
      obj.discount,
      obj.documentType,
      obj.customerId,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.customer ? CustomerEntity.create(obj.customer) : null,
      obj.branchOfficeId,
      obj.branchOffice ? BranchOfficeEntity.create(obj.branchOffice) : null,
      obj.quotationDetails ? obj.quotationDetails.map((quotationDetail) => QuotationDetailEntity.create(quotationDetail)) : null,
      obj.adressId,
      obj.address ? AddressEntity.create(obj.address) : null,
      obj.bill ? BillEntity.create(obj.bill) : null
    );
  }

  toObject(): any {
    return {
      id: this.id,
      startDate: this.startDate.toObject(),
      finalDate: this.finalDate.toObject(),
      project: this.project,
      code: this.code,
      total: this.total,
      subTotal: this.subTotal,
      tax: this.tax,
      discount: this.discount,
      documentType: this.documentType,
      customerId: this.customerId,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      customer: this.customer ? this.customer.toObject() : null,
      branchOfficeId: this.branchOfficeId,
      branchOffice: this.branchOffice ? this.branchOffice.toObject() : null,
      quotationDetails: this.quotationDetails ? this.quotationDetails.map((quotationDetail) => quotationDetail.toObject()) : null,
      adressId: this.adressId,
      address: this.address ? this.address.toObject() : null,
      bill: this.bill ? this.bill.toObject() : null,
    };
  }
}
