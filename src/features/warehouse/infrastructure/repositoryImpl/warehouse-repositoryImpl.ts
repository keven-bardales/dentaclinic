import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { WarehouseEntity } from "../../domain/entities/warehouse.entity";
import { WarehouseSourceImpl } from "../dataSourceImpl/warehouse-dataSourceImpl";

export class WarehouseRepositoryImpl extends BaseRepositoryImpl<WarehouseEntity> {
  constructor() {
    super(new WarehouseSourceImpl());
  }

  getAllWarehouses(): Promise<WarehouseEntity[] | null> {
    return (this.dataSource as WarehouseSourceImpl).getAllWarehouses();
  }
}
