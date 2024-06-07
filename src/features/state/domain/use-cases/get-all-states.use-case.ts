import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { StateEntity } from "../entities/state-entity";
import { StateRepositoryImpl } from "../../infrastructure/repositoryImpl/state-repositoryImpl";

export class GetStateUseCase {
  repository = new StateRepositoryImpl();

  async execute(): Promise<ApiResponse<StateEntity[] | null>> {
    const states = await this.repository.getAllStates();

    if (!states) {
      return ApiResponse.notFound({
        message: "Estados no encontrados",
        errors: ["Estados no encontrados"],
      });
    }

    return ApiResponse.success({
      data: states,
      message: "Estados obtenidos con éxito",
      statusCode: 200,
    });
  }
}
