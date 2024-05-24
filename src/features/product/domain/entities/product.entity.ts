import { BillDetailEntity } from "@/features/bill-detail/domain/entities/bill-entity";
import { ProductCategoryEntity } from "@/features/category/domain/entity/product-category.entity";
import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { ProductPricelistHistoryEntity } from "@/features/product-pricelist-history/domain/entities/product-pricelist-history.entity";
import { ProductPriceListEntity } from "@/features/product-pricelist/domain/entities/product-pricelist-entity";
import { ProductWarehouseHistoryEntity } from "@/features/product-warehouse-history/domain/entities/product-warehouse-history.entity";
import { ProductWarehouseEntity } from "@/features/product-warehouse/domain/entities/product-warehouse.entity";
import { QuotationDetailsEntity } from "@/features/quotation-details/domain/entities/quotation-detail.entity";

export class ProductEntity extends BaseEntity {
  static tableName = "product";

  constructor(
    public id: number,
    public name: string,
    public categoryId: number,
    public description: string | null,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public productPriceList: ProductPriceListEntity[],
    public quoteDetails: QuotationDetailsEntity[],
    public productWarehouses: ProductWarehouseEntity[],
    public productWarehouseHistory: ProductWarehouseHistoryEntity[],
    public productPricelistHistory: ProductPricelistHistoryEntity[],
    public billDetails: BillDetailEntity[],
    public category: ProductCategoryEntity
  ) {
    super(id, createdAt, updatedAt, ProductEntity.tableName);

    this.name = name;
    this.categoryId = categoryId;
    this.description = description;
    this.productPriceList = productPriceList;
    this.quoteDetails = quoteDetails;
    this.productWarehouses = productWarehouses;
    this.productWarehouseHistory = productWarehouseHistory;
    this.productPricelistHistory = productPricelistHistory;
    this.billDetails = billDetails;
    this.category = category;
  }

  static create(obj: any) {
    return new ProductEntity(
      obj.id,
      obj.name,
      obj.categoryId,
      obj.description,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.productPriceList,
      obj.quoteDetails,
      obj.ProductWarehouse,
      obj.ProductWarehouseHistory,
      obj.ProductPricelistHistory,
      obj.BillDetails,
      obj.category
    );
  }

  toObject(): any {
    return {
      id: this.id,
      name: this.name,
      categoryId: this.categoryId,
      description: this.description,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      productPriceList: this.productPriceList.map((priceList) => priceList.toObject()),
      quoteDetails: this.quoteDetails.map((quoteDetail) => quoteDetail.toObject()),
      productWarehouses: this.productWarehouses.map((productWarehouse) => productWarehouse.toObject()),
      productWarehouseHistory: this.productWarehouseHistory.map((history) => history.toObject()),
      productPricelistHistory: this.productPricelistHistory.map((history) => history.toObject()),
      billDetails: this.billDetails.map((billDetail) => billDetail.toObject()),
      category: this.category.toObject(),
    };
  }
}
