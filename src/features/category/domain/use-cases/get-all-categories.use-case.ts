import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { ProductCategoryEntity } from "../entity/product-category.entity";
import { ProductCategoryRepositoryImpl } from "../../infrastructure/repositoryImpl/product-categories-repositoryImpl";

export class GetCategoriesListUseCase {
  repository = new ProductCategoryRepositoryImpl();

  async execute(): Promise<ApiResponse<ProductCategoryEntity[] | null>> {
    const categories = await this.repository.getAllCategories();

    if (!categories) {
      return ApiResponse.notFound({
        message: "Categorias no encontradas",
        errors: ["Categorias no encontradas"],
      });
    }

    return ApiResponse.success({
      data: categories,
      message: "Categorias obtenidos con exito",
      statusCode: 200,
    });
  }
}
