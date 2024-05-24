import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { ProductEntity } from "@/features/product/domain/entities/product.entity";
import { PriceListEntity } from "@/features/pricelist/domain/entities/pricelist.entity";
import { ProductPricelistHistoryStatusEnum } from "../enum/product-pricelist-history.status.enum";

export class ProductPricelistHistoryEntity extends BaseEntity {
  static tableName = "product_pricelist_history";

  constructor(
    public id: bigint,
    public productId: number,
    public salePrice: number,
    public status: ProductPricelistHistoryStatusEnum,
    public startDate: Date,
    public endDate: Date,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public product: ProductEntity,
    public priceList: PriceListEntity | null,
    public priceListId: bigint | null
  ) {
    super(id, createdAt, updatedAt, ProductPricelistHistoryEntity.tableName);

    this.productId = productId;
    this.salePrice = salePrice;
    this.status = status;
    this.startDate = startDate;
    this.endDate = endDate;
    this.product = product;
    this.priceList = priceList;
    this.priceListId = priceListId;
  }

  static create(obj: any) {
    return new ProductPricelistHistoryEntity(
      obj.id,
      obj.productId,
      obj.salePrice,
      obj.status,
      new Date(obj.startDate),
      new Date(obj.endDate),
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
      startDate: this.startDate.toISOString(),
      endDate: this.endDate.toISOString(),
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      product: this.product.toObject(),
      priceList: this.priceList ? this.priceList.toObject() : null,
      priceListId: this.priceListId,
    };
  }
}
