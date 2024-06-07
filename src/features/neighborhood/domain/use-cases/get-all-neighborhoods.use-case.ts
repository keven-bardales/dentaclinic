import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { NeighborhoodEntity } from "../entities/neighborhood.entity";
import { NeighborhoodRepositoryImpl } from "../../infrastructure/repositoryImpl/neighborhood-repositoryImpl";

export class GetNeighborhoodUseCase {
  repository = new NeighborhoodRepositoryImpl();

  async execute(): Promise<ApiResponse<NeighborhoodEntity[] | null>> {
    const neighborhoods = await this.repository.getAllNeighborhoods();

    if (!neighborhoods) {
      return ApiResponse.notFound({
        message: "Barrios no encontrados",
        errors: ["Barrios no encontrados"],
      });
    }

    return ApiResponse.success({
      data: neighborhoods,
      message: "Barrios obtenidos con éxito",
      statusCode: 200,
    });
  }
}
