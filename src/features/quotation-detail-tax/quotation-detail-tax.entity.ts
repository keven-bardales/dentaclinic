import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { QuotationDetailsEntity } from "../quotation-details/domain/entities/quotation-detail.entity";
import { TaxEntity } from "../tax/domain/entities/tax.entity";

export class QuotationDetailTaxEntity extends BaseEntity {
  static tableName = "quotation_detail_tax";

  constructor(
    public id: number,
    public quotationDetailId: bigint,
    public taxId: number,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public quotationDetail: QuotationDetailsEntity,
    public tax: TaxEntity
  ) {
    super(id, createdAt, updatedAt, QuotationDetailTaxEntity.tableName);

    this.quotationDetailId = quotationDetailId;
    this.taxId = taxId;
    this.quotationDetail = quotationDetail;
    this.tax = tax;
  }

  static create(obj: any) {
    return new QuotationDetailTaxEntity(
      obj.id,
      obj.quotationDetailId,
      obj.taxId,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.quotationDetail,
      obj.tax
    );
  }

  toObject(): any {
    return {
      id: this.id,
      quotationDetailId: this.quotationDetailId,
      taxId: this.taxId,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      quotationDetail: this.quotationDetail.toObject(),
      tax: this.tax.toObject(),
    };
  }
}
