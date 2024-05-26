import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { QuotationDetailTaxEntity } from "@/features/quotation-detail-tax/quotation-detail-tax.entity";

export class TaxEntity extends BaseEntity {
  static tableName = "tax";

  constructor(
    public id: number,
    public name: string,
    public percentage: number,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public quotationDetailTax: QuotationDetailTaxEntity[],
    public billDetailTax: any[]
  ) {
    super(id, createdAt, updatedAt, TaxEntity.tableName);

    this.name = name;
    this.percentage = percentage;
    this.quotationDetailTax = quotationDetailTax;
    this.billDetailTax = billDetailTax;
  }

  static create(obj: any) {
    return new TaxEntity(
      obj.id,
      obj.name,
      obj.percentage,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.QuotationDetailTax,
      obj.BillDetailTax
    );
  }

  toObject(): any {
    return {
      id: this.id,
      name: this.name,
      percentage: this.percentage,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      quotationDetailTax: this.quotationDetailTax.map((detail) => detail.toObject()),
      billDetailTax: this.billDetailTax.map((detail) => detail.toObject()),
    };
  }
}
