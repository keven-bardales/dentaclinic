import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { ProductCategoryEntity } from "../../domain/entity/product-category.entity";
import { db } from "@/lib/db/db";
import { ProductCategory } from "@prisma/client";

export class ProductCategorySourceImpl extends BaseDataSourceImpl<ProductCategoryEntity> {
  constructor() {
    super(ProductCategoryEntity);
  }

  async getAllCategories(): Promise<ProductCategoryEntity[] | null> {
    const categories: any[] = await db.$queryRaw`
      WITH RECURSIVE category_hierarchy AS (
        SELECT
          id,
          name,
          "parentId",
          "categoryLevel",
          "createdAt",
          "updatedAt",
          1 AS depth
        FROM
          "ProductCategory"
        WHERE
          "parentId" IS NULL
        UNION ALL
        SELECT
          c.id,
          c.name,
          c."parentId",
          c."categoryLevel",
          c."createdAt",
          c."updatedAt",
          ch.depth + 1
        FROM
          "ProductCategory" c
        INNER JOIN
          category_hierarchy ch ON c."parentId" = ch.id
      )
      SELECT
        *
      FROM
        category_hierarchy
      ORDER BY
        depth, id;
    `;

    // Construir la jerarquía de categorías
    const categoryMap = new Map<number, any>();

    categories.forEach((category) => {
      category.subCategories = [];
      categoryMap.set(category.id, category);
    });

    const rootCategories: any[] = [];

    categories.forEach((category) => {
      if (category.parentId === null) {
        rootCategories.push(category);
      } else {
        const parentCategory = categoryMap.get(category.parentId);
        if (parentCategory) {
          parentCategory.subCategories.push(category);
        }
      }
    });

    // Transformar las categorías en entidades y retornar
    return rootCategories.map((category: any) => ProductCategoryEntity.create(category));
  }
}
