import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { CustomerEntity } from "../entities/customer.entity";
import { CustomerRepositoryImpl } from "../../infrastructure/repositoryImpl/customer-repositoryImpl";

export class GetCustomerListUseCase {
  repository = new CustomerRepositoryImpl();

  async execute(): Promise<ApiResponse<CustomerEntity[] | null>> {
    const customers = await this.repository.getAllCustomers();

    if (!customers) {
      return ApiResponse.notFound({
        message: "Clientes no encontrados",
        errors: ["Clientes no encontrados"],
      });
    }

    return ApiResponse.success({
      data: customers,
      message: "Clientes obtenidos con éxito",
      statusCode: 200,
    });
  }
}
