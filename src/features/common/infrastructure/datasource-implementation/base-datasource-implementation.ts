import { PrismaClient } from "@prisma/client/extension";
import { BaseDataSource } from "../../domain/datasource/base-datasource";
import { db } from "@/lib/db/db";
import { BaseEntity } from "../../domain/entities/base.entity";

export class BaseDataSourceImpl<T> extends BaseDataSource<T> {
  public tableName: string;
  private dataSource: PrismaClient = db;
  public entity: Partial<typeof BaseEntity>;

  constructor(entity: Partial<typeof BaseEntity>) {
    super();

    this.entity = entity;

    // @ts-ignore
    this.tableName = entity.tableName;
  }

  async create(item: T): Promise<T> {
    try {
      const createdItem = await this.dataSource[this.tableName as any].create({ data: item });

      const baseEntity = this?.entity?.create?.(createdItem);

      if (!this.entity) {
        return createdItem;
      }

      return baseEntity as T;
    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.dataSource[this.tableName as any].delete({ where: { id } });

      return true;
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  }

  async find(item: Partial<T>): Promise<T[]> {
    try {
      const foundItems = await this.dataSource[this.tableName as any].findMany({ where: item });

      if (!this.entity) {
        return foundItems as T[];
      }

      const toEntity = foundItems?.map((item: any) => {
        // @ts-ignore
        return this.entity?.create(item);
      });

      return toEntity as T[];
    } catch (error) {
      console.error("Error finding items:", error);
      throw error;
    }
  }

  async findOne(id: string): Promise<T | null> {
    try {
      const foundItem: T | null = await this.dataSource[this.tableName as any].findUnique({ where: { id } });

      if (!this.entity) {
        return foundItem as T;
      }

      const baseEntity = this?.entity?.create?.(foundItem);

      return baseEntity as T;
    } catch (error) {
      console.error("Error finding item:", error);
      throw error;
    }
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    try {
      const updatedItem: T | null = await this.dataSource[this.tableName as any].update({ where: { id }, data: item });

      if (!this.entity) {
        return updatedItem as T;
      }

      const baseEntity = this?.entity?.create?.(updatedItem);

      return baseEntity as T;
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  }

  async findMany(): Promise<T[]> {
    try {
      const items = await this.dataSource[this.tableName as any].findMany();

      if (!this.entity) {
        return items as T[];
      }

      const toEntity = items?.map((item: any) => {
        // @ts-ignore
        return this.entity?.create(item);
      });

      return toEntity as T[];
    } catch (error) {
      console.error("Error finding items:", error);
      throw error;
    }
  }
}
