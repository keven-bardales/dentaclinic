import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { ProductCategoryEntity } from "../../domain/entity/product-category.entity";
import { db } from "@/lib/db/db";

export class ProductCategorySourceImpl extends BaseDataSourceImpl<ProductCategoryEntity> {
  constructor() {
    super(ProductCategoryEntity);
  }

  async getAllCategories(): Promise<ProductCategoryEntity[] | null> {
    const categories = await db.productCategory.findMany({
      include: {
        subCategories: {
          include: {
            subCategories: true,
          },
        },
      },
    });

    return categories.map((category) => ProductCategoryEntity.create(category));
  }
}
