import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { ProductCategory } from "@prisma/client";
import { ProductCategorySourceImpl } from "../datasourceImpl/product-categories-datasourceImpl";
import { ProductCategoryEntity } from "../../domain/entity/product-category.entity";
import { z } from "zod";
import { createCategorySchema } from "../../domain/schemas/create-category-schema";

export class ProductCategoryRepositoryImpl extends BaseRepositoryImpl<ProductCategoryEntity> {
  constructor() {
    super(new ProductCategorySourceImpl());
  }

  getAllCategories(): Promise<ProductCategoryEntity[] | null> {
    return (this.dataSource as ProductCategorySourceImpl).getAllCategories();
  }

  findCategoryByName(name: string): Promise<ProductCategoryEntity | null> {
    return (this.dataSource as ProductCategorySourceImpl).findCategoryByName(name);
  }

  findById(id: number): Promise<ProductCategoryEntity | null> {
    return (this.dataSource as ProductCategorySourceImpl).findById(id);
  }

  createNewCategory(payload: z.infer<typeof createCategorySchema>): Promise<ProductCategoryEntity | null> {
    return (this.dataSource as ProductCategorySourceImpl).createCategory(payload);
  }

  deleteCategory(id: number): Promise<ProductCategoryEntity | null> {
    return (this.dataSource as ProductCategorySourceImpl).deleteCategory(id);
  }

  getSubCategories(id: number): Promise<ProductCategoryEntity[] | null> {
    return (this.dataSource as ProductCategorySourceImpl).getSubCategories(id);
  }

  findProductsAssociated(id: number): Promise<ProductCategoryEntity | null> {
    return (this.dataSource as ProductCategorySourceImpl).findProductsAssociated(id);
  }
}
