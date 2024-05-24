import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { QuotationRepositoryImpl } from "../../infrastructure/repository-implementation/quotation-repositoryImpl";
import { QuotationEntity } from "../entities/quotation.entity";

export class GetQuotationListUseCase {
  repository = new QuotationRepositoryImpl();

  async execute(): Promise<ApiResponse<QuotationEntity[] | null>> {
    const quotations = await this.repository.getAllQuotations();

    if (!quotations) {
      return ApiResponse.notFound({
        message: "Cotizaciones no encontradas",
        errors: ["Cotizaciones no encontradas"],
      });
    }

    return ApiResponse.success({
      data: quotations,
      message: "cotizaciones obtenidos con exito",
      statusCode: 200,
    });
  }
}
