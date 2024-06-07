import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { CountryRepositoryImpl } from "../../infrastructure/repositoryImpl/country-repositoryImpl";
import { CountryEntity } from "../entities/city.entity";

export class GetCountryUseCase {
  repository = new CountryRepositoryImpl();

  async execute(): Promise<ApiResponse<CountryEntity[] | null>> {
    const countries = await this.repository.getAllCountries();

    if (!countries) {
      return ApiResponse.notFound({
        message: "Países no encontrados",
        errors: ["Países no encontrados"],
      });
    }

    return ApiResponse.success({
      data: countries,
      message: "Países obtenidos con éxito",
      statusCode: 200,
    });
  }
}
