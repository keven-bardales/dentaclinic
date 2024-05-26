import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { WarehouseEntity } from "../entities/warehouse.entity";
import { WarehouseRepositoryImpl } from "../../infrastructure/repositoryImpl/warehouse-repositoryImpl";

export class GetWarehouseListUseCase {
  repository = new WarehouseRepositoryImpl();

  async execute(): Promise<ApiResponse<WarehouseEntity[] | null>> {
    const warehouses = await this.repository.getAllWarehouses();

    if (!warehouses) {
      return ApiResponse.notFound({
        message: "Almacenes no encontrados",
        errors: ["Almacenes no encontrados"],
      });
    }

    return ApiResponse.success({
      data: warehouses,
      message: "Almacenes obtenidos con éxito",
      statusCode: 200,
    });
  }
}
