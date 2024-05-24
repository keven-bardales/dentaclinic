import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { DiscountCodeEntity } from "@/features/discount-code/domain/entities/discount-code.entity";
import { QuotationDetailsEntity } from "@/features/quotation-details/domain/entities/quotation-detail.entity";

export class QuotationDetailDiscountCodeEntity extends BaseEntity {
  static tableName = "quotation_detail_discount_code";

  constructor(
    public id: number,
    public quotationDetailId: bigint,
    public discountCodeId: number,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public quotationDetail: QuotationDetailsEntity,
    public discountCode: DiscountCodeEntity
  ) {
    super(id, createdAt, updatedAt, QuotationDetailDiscountCodeEntity.tableName);

    this.quotationDetailId = quotationDetailId;
    this.discountCodeId = discountCodeId;
    this.quotationDetail = quotationDetail;
    this.discountCode = discountCode;
  }

  static create(obj: any) {
    return new QuotationDetailDiscountCodeEntity(
      obj.id,
      obj.quotationDetailId,
      obj.discountCodeId,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.quotationDetail,
      obj.discountCode
    );
  }

  toObject(): any {
    return {
      id: this.id,
      quotationDetailId: this.quotationDetailId,
      discountCodeId: this.discountCodeId,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      quotationDetail: this.quotationDetail.toObject(),
      discountCode: this.discountCode.toObject(),
    };
  }
}
