import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { ProductEntity } from "@/features/product/domain/entities/product.entity";
import { WarehouseEntity } from "@/features/warehouse/domain/entities/warehouse.entity";

export class ProductWarehouseHistoryEntity extends BaseEntity {
  static tableName = "product_warehouse_history";

  constructor(
    public id: number,
    public productId: number,
    public warehouseId: number,
    public stock: number,
    public cost: number,
    public startDate: Date,
    public endDate: Date | null,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public product: ProductEntity,
    public warehouse: WarehouseEntity
  ) {
    super(id, createdAt, updatedAt, ProductWarehouseHistoryEntity.tableName);

    this.productId = productId;
    this.warehouseId = warehouseId;
    this.stock = stock;
    this.cost = cost;
    this.startDate = startDate;
    this.endDate = endDate;
    this.product = product;
    this.warehouse = warehouse;
  }

  static create(obj: any) {
    return new ProductWarehouseHistoryEntity(
      obj.id,
      obj.productId,
      obj.warehouseId,
      obj.stock,
      obj.cost,
      new Date(obj.startDate),
      obj.endDate ? new Date(obj.endDate) : null,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.product,
      obj.warehouse
    );
  }

  toObject(): any {
    return {
      id: this.id,
      productId: this.productId,
      warehouseId: this.warehouseId,
      stock: this.stock,
      cost: this.cost,
      startDate: this.startDate.toISOString(),
      endDate: this.endDate ? this.endDate.toISOString() : null,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      product: this.product.toObject(),
      warehouse: this.warehouse.toObject(),
    };
  }
}
