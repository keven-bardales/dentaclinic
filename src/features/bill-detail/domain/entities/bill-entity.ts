import { BillEntity } from "@/features/bill/domain/entities/bill-entity";
import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { ProductEntity } from "@/features/product/domain/entities/product.entity";

export class BillDetailEntity extends BaseEntity {
  static tableName = "bill_details";

  constructor(
    public id: bigint,
    public billId: bigint,
    public quotationId: bigint,
    public description: string,
    public quantity: number,
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
    public bill: BillEntity,
    public product: ProductEntity
  ) {
    super(id, createdAt, updatedAt, BillDetailEntity.tableName);

    this.billId = billId;
    this.quotationId = quotationId;
    this.description = description;
    this.quantity = quantity;
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
    this.bill = bill;
    this.product = product;
  }

  static create(obj: any) {
    return new BillDetailEntity(
      obj.id,
      obj.billId,
      obj.quotationId,
      obj.description,
      obj.quantity,
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
      obj.bill,
      obj.product
    );
  }

  toObject(): any {
    return {
      id: this.id,
      billId: this.billId,
      quotationId: this.quotationId,
      description: this.description,
      quantity: this.quantity,
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
      bill: this.bill.toObject(),
      product: this.product.toObject(),
    };
  }
}
