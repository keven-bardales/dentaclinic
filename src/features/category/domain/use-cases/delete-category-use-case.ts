import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { ProductCategoryEntity } from "../entity/product-category.entity";
import { ProductCategoryRepositoryImpl } from "../../infrastructure/repositoryImpl/product-categories-repositoryImpl";

export class DeleteCategoryUseCase {
  repository = new ProductCategoryRepositoryImpl();

  async execute(payload: { categoryId: number }): Promise<ApiResponse<ProductCategoryEntity | null>> {
    const foundById = await this.repository.findById(payload.categoryId);

    if (!foundById) {
      return ApiResponse.notFound({
        message: "Categoria no existe",
        errors: ["Categoria no existe"],
      });
    }

    const foundSubCategories = await this.repository.getSubCategories(payload.categoryId);

    if (foundSubCategories && foundSubCategories.length > 0) {
      return ApiResponse.notFound({
        message: "Categoria tiene subcategorias",
        errors: ["Categoria tiene subcategorias"],
      });
    }

    const anySubCategoryHasProducts = foundSubCategories?.some((subCategory) => subCategory.products?.length > 0);

    if (anySubCategoryHasProducts) {
      return ApiResponse.notFound({
        message: "Subcategorias tienen productos asociados",
        errors: ["Subcategorias tienen productos asociados"],
      });
    }

    const productsAssociated = await this.repository.findProductsAssociated(payload.categoryId);

    if (productsAssociated && productsAssociated?.products?.length > 0) {
      return ApiResponse.notFound({
        message: "Categoria tiene productos asociados",
        errors: ["Categoria tiene productos asociados"],
      });
    }

    const deletedCategory = await this.repository.deleteCategory(payload.categoryId);

    if (!deletedCategory) {
      return ApiResponse.notFound({
        message: "Error al eliminar categoria",
        errors: ["Error al eliminar categoria"],
      });
    }

    return ApiResponse.success({
      data: deletedCategory,
      message: "Categoria eliminada con exito",
      statusCode: 200,
    });
  }
}
