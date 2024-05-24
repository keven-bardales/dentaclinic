import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { QuotationEntity } from "@/features/quotation/domain/entities/quotation.entity";
import { ProductEntity } from "@/features/product/domain/entities/product.entity";
import { QuotationDetailTaxEntity } from "@/features/quotation-detail-tax/quotation-detail-tax.entity";
import { QuotationDetailDiscountCodeEntity } from "@/features/quotation-detail-discount-codes/domain/entities/quotation-details-discount-codes.entity";

export class QuotationDetailsEntity extends BaseEntity {
  static tableName = "quotation_details";

  constructor(
    public id: bigint,
    public quotationId: bigint,
    public description: string,
    public quantity: number,
    public price: number,
    public priceWithDiscount: number,
    public priceWithTax: number,
    public subTotal: number,
    public subTotalWithDiscount: number,
    public subTotalWithTax: number,
    public discountPercentage: number,
    public discountAmount: number,
    public taxPercentage: number,
    public taxAmount: number,
    public total: number,
    public productId: number,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public quotation: QuotationEntity,
    public product: ProductEntity,
    public quotationDetailTax: QuotationDetailTaxEntity[],
    public quotationDetailDiscountCode: QuotationDetailDiscountCodeEntity[]
  ) {
    super(id, createdAt, updatedAt, QuotationDetailsEntity.tableName);

    this.quotationId = quotationId;
    this.description = description;
    this.quantity = quantity;
    this.price = price;
    this.priceWithDiscount = priceWithDiscount;
    this.priceWithTax = priceWithTax;
    this.subTotal = subTotal;
    this.subTotalWithDiscount = subTotalWithDiscount;
    this.subTotalWithTax = subTotalWithTax;
    this.discountPercentage = discountPercentage;
    this.discountAmount = discountAmount;
    this.taxPercentage = taxPercentage;
    this.taxAmount = taxAmount;
    this.total = total;
    this.productId = productId;
    this.quotation = quotation;
    this.product = product;
    this.quotationDetailTax = quotationDetailTax;
    this.quotationDetailDiscountCode = quotationDetailDiscountCode;
  }

  static create(obj: any) {
    return new QuotationDetailsEntity(
      obj.id,
      obj.quotationId,
      obj.description,
      obj.quantity,
      obj.price,
      obj.priceWithDiscount,
      obj.priceWithTax,
      obj.subTotal,
      obj.subTotalWithDiscount,
      obj.subTotalWithTax,
      obj.discountPercentage,
      obj.discountAmount,
      obj.taxPercentage,
      obj.taxAmount,
      obj.total,
      obj.productId,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.quotation,
      obj.product,
      obj.QuotationDetailTax,
      obj.QuotationDetailDiscountCode
    );
  }

  toObject(): any {
    return {
      id: this.id,
      quotationId: this.quotationId,
      description: this.description,
      quantity: this.quantity,
      price: this.price,
      priceWithDiscount: this.priceWithDiscount,
      priceWithTax: this.priceWithTax,
      subTotal: this.subTotal,
      subTotalWithDiscount: this.subTotalWithDiscount,
      subTotalWithTax: this.subTotalWithTax,
      discountPercentage: this.discountPercentage,
      discountAmount: this.discountAmount,
      taxPercentage: this.taxPercentage,
      taxAmount: this.taxAmount,
      total: this.total,
      productId: this.productId,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      quotation: this.quotation.toObject(),
      product: this.product.toObject(),
      quotationDetailTax: this.quotationDetailTax.map((tax) => tax.toObject()),
      quotationDetailDiscountCode: this.quotationDetailDiscountCode.map((discount) => discount.toObject()),
    };
  }
}
