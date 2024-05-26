import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { ProductEntity } from "../../domain/entities/product.entity";
import { ProductSourceImpl } from "../dataSourceImpl/product-dataSourceImpl";

export class ProductRepositoryImpl extends BaseRepositoryImpl<ProductEntity> {
  constructor() {
    super(new ProductSourceImpl());
  }

  getAllCategories(): Promise<ProductEntity[] | null> {
    return (this.dataSource as ProductSourceImpl).getAllProducts();
  }
}
