import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { db } from "@/lib/db/db";
import { ProductEntity } from "../../domain/entities/product.entity";

export class ProductSourceImpl extends BaseDataSourceImpl<ProductEntity> {
  constructor() {
    super(ProductEntity);
  }

  async getAllProducts(): Promise<ProductEntity[] | null> {
    const products = await db.product.findMany({
      include: {
        category: true,
      },
    });

    return products.map((product) => {
      return ProductEntity.create(product);
    });
  }
}
