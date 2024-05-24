import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { AddressEntity } from "@/features/address/domain/entities/address.entity";
import { BranchOfficeEntity } from "@/features/branch-office/domain/entities/branch-office.entity";
import { WarehouseStatusEnum } from "../enum/warehouse.-status.enum";
import { ProductWarehouseEntity } from "@/features/product-warehouse/domain/entities/product-warehouse.entity";
import { ProductWarehouseHistoryEntity } from "@/features/product-warehouse-history/domain/entities/product-warehouse-history.entity";

export class WarehouseEntity extends BaseEntity {
  static tableName = "warehouse";

  constructor(
    public id: number,
    public name: string,
    public description: string | null,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public productWarehouses: ProductWarehouseEntity[],
    public address: AddressEntity | null,
    public addressId: number | null,
    public branchOfficeId: number | null,
    public productWarehouseHistory: ProductWarehouseHistoryEntity[],
    public warehouseStatus: WarehouseStatusEnum,
    public branchOffice: BranchOfficeEntity | null
  ) {
    super(id, createdAt, updatedAt, WarehouseEntity.tableName);

    this.name = name;
    this.description = description;
    this.productWarehouses = productWarehouses;
    this.address = address;
    this.addressId = addressId;
    this.branchOfficeId = branchOfficeId;
    this.productWarehouseHistory = productWarehouseHistory;
    this.warehouseStatus = warehouseStatus;
    this.branchOffice = branchOffice;
  }

  static create(obj: any) {
    return new WarehouseEntity(
      obj.id,
      obj.name,
      obj.description,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.ProductWarehouse,
      obj.Address,
      obj.addressId,
      obj.branchOfficeId,
      obj.ProductWarehouseHistory,
      obj.warehouseStatus,
      obj.branchOffice
    );
  }

  toObject(): any {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      productWarehouses: this.productWarehouses.map((productWarehouse) => productWarehouse.toObject()),
      address: this.address ? this.address.toObject() : null,
      addressId: this.addressId,
      branchOfficeId: this.branchOfficeId,
      productWarehouseHistory: this.productWarehouseHistory.map((history) => history.toObject()),
      warehouseStatus: this.warehouseStatus,
      branchOffice: this.branchOffice ? this.branchOffice.toObject() : null,
    };
  }
}
