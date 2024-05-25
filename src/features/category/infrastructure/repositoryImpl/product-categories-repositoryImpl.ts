import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { ProductCategory } from "@prisma/client";
import { ProductCategorySourceImpl } from "../datasourceImpl/product-categories-datasourceImpl";
import { ProductCategoryEntity } from "../../domain/entity/product-category.entity";

export class ProductCategoryRepositoryImpl extends BaseRepositoryImpl<ProductCategoryEntity> {
  constructor() {
    super(new ProductCategorySourceImpl());
  }

  getAllCategories(): Promise<ProductCategoryEntity[] | null> {
    return (this.dataSource as ProductCategorySourceImpl).getAllCategories();
  }
}
