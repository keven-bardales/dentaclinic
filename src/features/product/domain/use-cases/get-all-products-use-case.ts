import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { ProductEntity } from "../entities/product.entity";
import { ProductRepositoryImpl } from "../../infrastructure/repositoryImpl/product-repositoryImpl";

export class GetProductsListUseCase {
  repository = new ProductRepositoryImpl();

  async execute(): Promise<ApiResponse<ProductEntity[] | null>> {
    const products = await this.repository.getAllCategories();

    if (!products) {
      return ApiResponse.notFound({
        message: "Productos no encontrados",
        errors: ["Categorias no encontradas"],
      });
    }

    return ApiResponse.success({
      data: products,
      message: "Productos obtenidos con exito",
      statusCode: 200,
    });
  }
}
