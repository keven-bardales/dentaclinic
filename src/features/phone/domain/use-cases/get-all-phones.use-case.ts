import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { PhoneEntity } from "../entities/phone.entity";
import { PhoneRepositoryImpl } from "../../infrastructure/repositoryImpl/phone-repositoryImpl";

export class GetPhoneUseCase {
  repository = new PhoneRepositoryImpl();

  async execute(): Promise<ApiResponse<PhoneEntity[] | null>> {
    const phones = await this.repository.getAllPhones();

    if (!phones) {
      return ApiResponse.notFound({
        message: "Teléfonos no encontrados",
        errors: ["Teléfonos no encontrados"],
      });
    }

    return ApiResponse.success({
      data: phones,
      message: "Teléfonos obtenidos con éxito",
      statusCode: 200,
    });
  }
}
