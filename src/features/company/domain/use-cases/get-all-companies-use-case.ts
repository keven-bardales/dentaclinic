import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { CompanyRepositoryImpl } from "../../infrastructure/repositoryImpl/company-repositoryImpl";
import { CompanyEntity } from "../entities/company.entitity";

export class GetCompanyUseCase {
  repository = new CompanyRepositoryImpl();

  async execute(): Promise<ApiResponse<CompanyEntity[] | null>> {
    const companies = await this.repository.getAllCompanies();

    if (!companies) {
      return ApiResponse.notFound({
        message: "Compañías no encontradas",
        errors: ["Compañías no encontradas"],
      });
    }

    return ApiResponse.success({
      data: companies,
      message: "Compañías obtenidas con éxito",
      statusCode: 200,
    });
  }
}
