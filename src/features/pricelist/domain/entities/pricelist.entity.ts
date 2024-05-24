import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { PricelistStatusEnum } from "../enums/pricelist-status.enum";
import { ProductPriceListEntity } from "@/features/product-pricelist/domain/entities/product-pricelist-entity";
import { ProductPricelistHistoryEntity } from "@/features/product-pricelist-history/domain/entities/product-pricelist-history.entity";

export class PriceListEntity extends BaseEntity {
  static tableName = "price_list";

  constructor(
    public id: number,
    public name: string,
    public description: string | null,
    public status: PricelistStatusEnum,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public priceList: ProductPriceListEntity[],
    public productPricelistHistory: ProductPricelistHistoryEntity[]
  ) {
    super(id, createdAt, updatedAt, PriceListEntity.tableName);

    this.name = name;
    this.description = description;
    this.status = status;
    this.priceList = priceList;
    this.productPricelistHistory = productPricelistHistory;
  }

  static create(obj: any) {
    return new PriceListEntity(
      obj.id,
      obj.name,
      obj.description,
      obj.status,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.priceList,
      obj.ProductPricelistHistory
    );
  }

  toObject(): any {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      priceList: this.priceList.map((priceList) => priceList.toObject()),
      productPricelistHistory: this.productPricelistHistory.map((history) => history.toObject()),
    };
  }
}
