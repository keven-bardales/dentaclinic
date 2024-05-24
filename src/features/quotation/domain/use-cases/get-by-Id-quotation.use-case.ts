import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { QuotationRepositoryImpl } from "../../infrastructure/repository-implementation/quotation-repositoryImpl";
import { QuotationEntity } from "../entities/quotation.entity";

export class GetQuotationByIdUseCase {
  repository = new QuotationRepositoryImpl();

  async execute(id: number): Promise<ApiResponse<QuotationEntity | null>> {
    const quotation = await this.repository.getById(id);

    if (!quotation) {
      return ApiResponse.notFound({
        message: "Cotizaciones no encontradas",
        errors: ["Cotizaciones no encontradas"],
      });
    }

    return ApiResponse.success({
      data: quotation,
      message: "cotizaciones obtenidos con exito",
      statusCode: 200,
    });
  }
}
