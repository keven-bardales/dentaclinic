import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { ProductCategoryEntity } from "../entity/product-category.entity";
import { ProductCategoryRepositoryImpl } from "../../infrastructure/repositoryImpl/product-categories-repositoryImpl";
import { z } from "zod";
import { createCategorySchema } from "../schemas/create-category-schema";
import { VALIDCATEGORYLEVELS } from "../constants/category-levels-constant";

export class CreateCategoryUseCase {
  repository = new ProductCategoryRepositoryImpl();

  async execute(payload: z.infer<typeof createCategorySchema>): Promise<ApiResponse<ProductCategoryEntity | null>> {
    const validatedFields = createCategorySchema.safeParse(payload);

    if (!validatedFields.success) {
      return ApiResponse.notFound({
        message: "Datos invalidos",
        errors: validatedFields.error.errors?.map((error) => error.message),
      });
    }

    const findCategoryByName = await this.repository.findCategoryByName(validatedFields.data.categoryName);

    if (findCategoryByName) {
      return ApiResponse.notFound({
        message: "Categoria ya existe",
        errors: ["Categoria ya existe"],
      });
    }

    let parendId = payload.parentId;
    let parentCategory: ProductCategoryEntity | null = null;
    let levelToCreate = 1;

    if (parendId) {
      parentCategory = await this.repository.findById(parendId);
      levelToCreate = parentCategory ? parentCategory.categoryLevel + 1 : 1;
    }

    if (!parentCategory && parendId) {
      return ApiResponse.notFound({
        message: "Categoria padre no existe",
        errors: ["Categoria padre no existe"],
      });
    }

    const isValidLevelToCreate = VALIDCATEGORYLEVELS.includes(levelToCreate);

    if (!isValidLevelToCreate) {
      return ApiResponse.notFound({
        message: "Nivel de categoria invalido",
        errors: ["Nivel de categoria invalido"],
      });
    }

    const newCategory = await this.repository.createNewCategory({
      categoryName: validatedFields.data.categoryName,
      parentId: parendId,
      categoryLevel: levelToCreate,
    });

    return ApiResponse.success({
      data: newCategory,
      message: "Categorias obtenidos con exito",
      statusCode: 200,
    });
  }
}
