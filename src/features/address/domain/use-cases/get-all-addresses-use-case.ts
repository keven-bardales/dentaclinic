import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { AddressEntity } from "../entities/address.entity";
import { AddressRepositoryImpl } from "../../infrastructure/repositoryImpl/address-repositoryImpl";

export class GetAddressUseCase {
  repository = new AddressRepositoryImpl();

  async execute(): Promise<ApiResponse<AddressEntity[] | null>> {
    const addresses = await this.repository.getAllAddresses();

    if (!addresses) {
      return ApiResponse.notFound({
        message: "Direcciones no encontradas",
        errors: ["Direcciones no encontradas"],
      });
    }

    return ApiResponse.success({
      data: addresses,
      message: "Direcciones obtenidas con éxito",
      statusCode: 200,
    });
  }
}
