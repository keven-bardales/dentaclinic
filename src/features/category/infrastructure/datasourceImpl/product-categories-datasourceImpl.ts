import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { ProductCategoryEntity } from "../../domain/entity/product-category.entity";
import { db } from "@/lib/db/db";
import { createCategorySchema } from "../../domain/schemas/create-category-schema";
import { z } from "zod";

export class ProductCategorySourceImpl extends BaseDataSourceImpl<ProductCategoryEntity> {
  constructor() {
    super(ProductCategoryEntity);
  }

  async getAllCategories(): Promise<ProductCategoryEntity[] | null> {
    const queryCategories: any[] = await db.productCategory.findMany({
      where: {
        isDeleted: false,
      },
    });

    // Construir la jerarquía de categorías
    const categoryMap = new Map<number, any>();

    const categories = queryCategories.filter((cat) => !cat.isDeleted);

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

  async findCategoryByName(name: string): Promise<ProductCategoryEntity | null> {
    const foundInDb = await db.productCategory.findFirst({
      where: {
        name: {
          equals: name.toLowerCase(),
          mode: "insensitive",
        },
      },
    });

    if (!foundInDb) {
      return null;
    }

    return ProductCategoryEntity.create(foundInDb);
  }

  async findById(id: number): Promise<ProductCategoryEntity | null> {
    const foundInDb = await db.productCategory.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!foundInDb) {
      return null;
    }

    return ProductCategoryEntity.create(foundInDb);
  }

  async createCategory(payload: z.infer<typeof createCategorySchema>) {
    const newCategory = await db.productCategory.create({
      data: {
        name: payload.categoryName,
        parentId: payload.parentId,
        categoryLevel: payload.categoryLevel,
      },
    });

    return ProductCategoryEntity.create(newCategory);
  }

  async deleteCategory(id: number): Promise<ProductCategoryEntity | null> {
    const deletedCategory = await db.productCategory.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    return ProductCategoryEntity.create(deletedCategory);
  }

  async getSubCategories(id: number): Promise<ProductCategoryEntity[] | null> {
    const subCategories = await db.productCategory.findMany({
      where: {
        parentId: id,
        isDeleted: false,
      },
      include: {
        product: true,
      },
    });

    return subCategories.map((category) => ProductCategoryEntity.create(category));
  }

  async findProductsAssociated(id: number): Promise<ProductCategoryEntity | null> {
    const foundInDb = await db.productCategory.findFirst({
      where: {
        id,
      },
      include: {
        product: true,
      },
    });

    if (!foundInDb) {
      return null;
    }

    return ProductCategoryEntity.create(foundInDb);
  }
}
