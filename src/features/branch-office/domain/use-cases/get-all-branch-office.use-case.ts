import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { BranchOfficeEntity } from "../entities/branch-office.entity";
import { BranchOfficeRepositoryImpl } from "../../infrastructure/repositoryImpl/branch-office-repositoryImpl";

export class GetBranchOfficeUseCase {
  repository = new BranchOfficeRepositoryImpl();

  async execute(): Promise<ApiResponse<BranchOfficeEntity[] | null>> {
    const branchOffices = await this.repository.getAllBranchOffices();

    if (!branchOffices) {
      return ApiResponse.notFound({
        message: "Sucursales no encontradas",
        errors: ["Sucursales no encontradas"],
      });
    }

    return ApiResponse.success({
      data: branchOffices,
      message: "Sucursales obtenidas con éxito",
      statusCode: 200,
    });
  }
}
