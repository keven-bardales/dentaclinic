import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { PriceListRepositoryImpl } from "../../infrastructure/repositoryImpl/pricelist-repositoryImpl";
import { PriceListEntity } from "../entities/pricelist.entity";

export class GetPriceListUseCase {
  repository = new PriceListRepositoryImpl();

  async execute(): Promise<ApiResponse<PriceListEntity[] | null>> {
    const priceLists = await this.repository.getAllPriceLists();

    if (!priceLists) {
      return ApiResponse.notFound({
        message: "Listas de precios no encontradas",
        errors: ["Listas de precios no encontradas"],
      });
    }

    return ApiResponse.success({
      data: priceLists,
      message: "Listas de precios obtenidas con éxito",
      statusCode: 200,
    });
  }
}
