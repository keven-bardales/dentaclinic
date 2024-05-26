import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { db } from "@/lib/db/db";
import { WarehouseEntity } from "../../domain/entities/warehouse.entity";

export class WarehouseSourceImpl extends BaseDataSourceImpl<WarehouseEntity> {
  constructor() {
    super(WarehouseEntity);
  }

  async getAllWarehouses(): Promise<WarehouseEntity[] | null> {
    const warehouses = await db.warehouse.findMany({
      include: {
        Address: true,
        branchOffice: true,
      },
    });

    return warehouses.map((warehouse) => {
      return WarehouseEntity.create(warehouse);
    });
  }
}
