import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { ProductEntity } from "@/features/product/domain/entities/product.entity";

export class ProductCategoryEntity extends BaseEntity {
  static tableName = "product_category";

  constructor(
    public id: number,
    public name: string,
    public parentId: number | null,
    public categoryLevel: number,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public parent: ProductCategoryEntity | null,
    public subCategories: ProductCategoryEntity[],
    public products: ProductEntity[]
  ) {
    super(id, createdAt, updatedAt, ProductCategoryEntity.tableName);

    this.name = name;
    this.parentId = parentId;
    this.categoryLevel = categoryLevel;
    this.parent = parent;
    this.subCategories = subCategories;
    this.products = products;
  }

  static create(obj: any) {
    return new ProductCategoryEntity(
      obj.id,
      obj.name,
      obj.parentId,
      obj.categoryLevel,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.parent,
      obj.subCategories?.map((category: any) => ProductCategoryEntity.create(category)),
      obj.products
    );
  }

  toObject(): any {
    return {
      id: this.id,
      name: this.name,
      parentId: this.parentId,
      categoryLevel: this.categoryLevel,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      parent: this.parent ? this.parent.toObject() : null,
      subCategories: this.subCategories.map((category) => category.toObject()),
      products: this.products.map((product) => product.toObject()),
    };
  }
}
