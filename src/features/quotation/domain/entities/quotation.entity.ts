import { AddressEntity } from "@/features/address/domain/entities/address.entity";
import { BillEntity } from "@/features/bill/domain/entities/bill-entity";
import { BranchOfficeEntity } from "@/features/branch-office/domain/entities/branch-office.entity";
import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { TypesOfDocuments } from "@/features/common/domain/enums/document-types";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { CustomerEntity } from "@/features/customer/domain/entities/customer.entity";
import { QuotationDetailsEntity } from "@/features/quotation-details/domain/entities/quotation-detail.entity";
import { Prisma } from "@prisma/client";

export class QuotationEntity extends BaseEntity {
  static tableName = "quotation";

  constructor(
    public id: number,
    public startDate: DateWrapper,
    public finalDate: DateWrapper,
    public project: string,
    public code: string,
    public total: Prisma.Decimal,
    public subTotal: Prisma.Decimal,
    public tax: Prisma.Decimal,
    public discount: Prisma.Decimal,
    public documentType: TypesOfDocuments,
    public customerId: string,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public customer: CustomerEntity | null,
    public branchOfficeId: number,
    public branchOffice: BranchOfficeEntity | null,
    public quotationDetails: QuotationDetailsEntity[],
    public adressId: number,
    public address: AddressEntity | null,
    public bill: BillEntity | null
  ) {
    super(id, createdAt, updatedAt, QuotationEntity.tableName);

    this.startDate = startDate;
    this.finalDate = finalDate;
    this.project = project;
    this.code = code;
    this.total = total;
    this.subTotal = subTotal;
    this.tax = tax;
    this.discount = discount;
    this.documentType = documentType;
    this.customerId = customerId;
    this.customer = customer;
    this.branchOfficeId = branchOfficeId;
    this.branchOffice = branchOffice;
    this.quotationDetails = quotationDetails;
    this.adressId = adressId;
    this.address = address;
    this.bill = bill;
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
      obj.quotationDetails ? obj.quotationDetails.map((quotationDetail: any) => QuotationDetailsEntity.create(quotationDetail)) : null,
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
