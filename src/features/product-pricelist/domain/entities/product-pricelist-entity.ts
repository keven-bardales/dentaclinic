import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { ProductEntity } from "@/features/product/domain/entities/product.entity";
import { ProductPriceListStatusEnum } from "../enums/product-pricelist-status.enum";
import { PriceListEntity } from "@/features/pricelist/domain/entities/pricelist.entity";

export class ProductPriceListEntity extends BaseEntity {
  static tableName = "product_price_list";

  constructor(
    public id: bigint,
    public productId: number,
    public salePrice: number,
    public status: ProductPriceListStatusEnum,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public product: ProductEntity,
    public priceList: PriceListEntity | null,
    public priceListId: bigint | null
  ) {
    super(id, createdAt, updatedAt, ProductPriceListEntity.tableName);

    this.productId = productId;
    this.salePrice = salePrice;
    this.status = status;
    this.product = product;
    this.priceList = priceList;
    this.priceListId = priceListId;
  }

  static create(obj: any) {
    return new ProductPriceListEntity(
      obj.id,
      obj.productId,
      obj.salePrice,
      obj.status,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.product,
      obj.priceList,
      obj.priceListId
    );
  }

  toObject(): any {
    return {
      id: this.id,
      productId: this.productId,
      salePrice: this.salePrice,
      status: this.status,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      product: this.product.toObject(),
      priceList: this.priceList ? this.priceList.toObject() : null,
      priceListId: this.priceListId,
    };
  }
}
