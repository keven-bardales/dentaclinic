import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { CityEntity } from "../entities/city.entity";
import { CityRepositoryImpl } from "../../infrastructure/repositoryImpl/cities-repositoryImpl";

export class GetCityUseCase {
  repository = new CityRepositoryImpl();

  async execute(): Promise<ApiResponse<CityEntity[] | null>> {
    const cities = await this.repository.getAllCities();

    if (!cities) {
      return ApiResponse.notFound({
        message: "Ciudades no encontradas",
        errors: ["Ciudades no encontradas"],
      });
    }

    return ApiResponse.success({
      data: cities,
      message: "Ciudades obtenidas con éxito",
      statusCode: 200,
    });
  }
}
