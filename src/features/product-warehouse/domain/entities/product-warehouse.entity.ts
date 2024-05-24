import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { ProductEntity } from "@/features/product/domain/entities/product.entity";
import { WarehouseEntity } from "@/features/warehouse/domain/entities/warehouse.entity";
import { WarehouseStatusEnum } from "@/features/warehouse/domain/enum/warehouse.-status.enum";

export class ProductWarehouseEntity extends BaseEntity {
  static tableName = "productWarehouse";

  constructor(
    public id: number,
    public productId: number,
    public warehouseId: number,
    public stock: number,
    public cost: number,
    public status: WarehouseStatusEnum,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public product: ProductEntity,
    public warehouse: WarehouseEntity
  ) {
    super(id, createdAt, updatedAt, ProductWarehouseEntity.tableName);

    this.productId = productId;
    this.warehouseId = warehouseId;
    this.stock = stock;
    this.cost = cost;
    this.status = status;
    this.product = product;
    this.warehouse = warehouse;
  }

  static create(obj: any) {
    return new ProductWarehouseEntity(
      obj.id,
      obj.productId,
      obj.warehouseId,
      obj.stock,
      obj.cost,
      obj.status,
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
      status: this.status,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      product: this.product.toObject(),
      warehouse: this.warehouse.toObject(),
    };
  }
}
