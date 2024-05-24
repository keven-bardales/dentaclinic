import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { CustomerEntity } from "@/features/customer/domain/entities/customer.entity";
import { AddressEntity } from "@/features/address/domain/entities/address.entity";
import { QuotationEntity } from "@/features/quotation/domain/entities/quotation.entity";
import { BranchOfficeEntity } from "@/features/branch-office/domain/entities/branch-office.entity";
import { DocumentTypes } from "@prisma/client";
import { BillDetailEntity } from "@/features/bill-detail/domain/entities/bill-entity";

export class BillEntity extends BaseEntity {
  static tableName = "bill";

  constructor(
    public id: bigint,
    public startDate: Date,
    public finalDate: Date,
    public project: string,
    public code: string,
    public documentType: DocumentTypes,
    public customerId: string,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public customer: CustomerEntity,
    public billDetails: BillDetailEntity[],
    public addressId: number | null,
    public branchOfficeId: number | null,
    public address: AddressEntity | null,
    public quotationId: bigint | null,
    public quotation: QuotationEntity | null,
    public branchOffice: BranchOfficeEntity | null
  ) {
    super(id, createdAt, updatedAt, BillEntity.tableName);

    this.startDate = startDate;
    this.finalDate = finalDate;
    this.project = project;
    this.code = code;
    this.documentType = documentType;
    this.customerId = customerId;
    this.addressId = addressId;
    this.branchOfficeId = branchOfficeId;
    this.address = address;
    this.quotationId = quotationId;
    this.quotation = quotation;
    this.branchOffice = branchOffice;
    this.customer = customer;
    this.billDetails = billDetails;
  }

  static create(obj: any) {
    return new BillEntity(
      obj.id,
      new Date(obj.startDate),
      new Date(obj.finalDate),
      obj.project,
      obj.code,
      obj.documentType,
      obj.customerId,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.customer,
      obj.billDetails,
      obj.addressId,
      obj.branchOfficeId,
      obj.address,
      obj.quotationId,
      obj.quotation,
      obj.branchOffice
    );
  }

  toObject(): any {
    return {
      id: this.id,
      startDate: this.startDate.toISOString(),
      finalDate: this.finalDate.toISOString(),
      project: this.project,
      code: this.code,
      documentType: this.documentType,
      customerId: this.customerId,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      customer: this.customer.toObject(),
      billDetails: this.billDetails.map((billDetail) => billDetail.toObject()),
      addressId: this.addressId,
      branchOfficeId: this.branchOfficeId,
      address: this.address ? this.address.toObject() : null,
      quotationId: this.quotationId,
      quotation: this.quotation ? this.quotation.toObject() : null,
      branchOffice: this.branchOffice ? this.branchOffice.toObject() : null,
    };
  }
}
