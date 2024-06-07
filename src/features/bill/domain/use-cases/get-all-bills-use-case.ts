import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { BillRepositoryImpl } from "../../infrastructure/repositoryImpl/bill-repositoryImpl";
import { BillEntity } from "../entities/bill-entity";

export class GetBillUseCase {
  repository = new BillRepositoryImpl();

  async execute(): Promise<ApiResponse<BillEntity[] | null>> {
    const bills = await this.repository.getAllBills();

    if (!bills) {
      return ApiResponse.notFound({
        message: "Facturas no encontradas",
        errors: ["Facturas no encontradas"],
      });
    }

    return ApiResponse.success({
      data: bills,
      message: "Facturas obtenidas con éxito",
      statusCode: 200,
    });
  }
}
