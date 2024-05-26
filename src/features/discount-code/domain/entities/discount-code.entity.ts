import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { QuotationDetailDiscountCodeEntity } from "@/features/quotation-detail-discount-codes/domain/entities/quotation-details-discount-codes.entity";

export class DiscountCodeEntity extends BaseEntity {
  static tableName = "discount_code";

  constructor(
    public id: number,
    public code: string,
    public percentage: number,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public quotationDetailDiscountCode: QuotationDetailDiscountCodeEntity[],
    public billDetailDiscountCode: any[]
  ) {
    super(id, createdAt, updatedAt, DiscountCodeEntity.tableName);

    this.code = code;
    this.percentage = percentage;
    this.quotationDetailDiscountCode = quotationDetailDiscountCode;
    this.billDetailDiscountCode = billDetailDiscountCode;
  }

  static create(obj: any) {
    return new DiscountCodeEntity(
      obj.id,
      obj.code,
      obj.percentage,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.QuotationDetailDiscountCode,
      obj.BillDetailDiscountCode
    );
  }

  toObject(): any {
    return {
      id: this.id,
      code: this.code,
      percentage: this.percentage,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      quotationDetailDiscountCode: this.quotationDetailDiscountCode.map((detail) => detail.toObject()),
      billDetailDiscountCode: this.billDetailDiscountCode.map((detail) => detail.toObject()),
    };
  }
}
