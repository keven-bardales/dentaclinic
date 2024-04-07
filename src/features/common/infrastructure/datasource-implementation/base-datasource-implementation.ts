import { PrismaClient } from "@prisma/client/extension";
import { BaseDataSource } from "../../domain/datasource/base-datasource";

export class BaseDataSourceImpl<T> extends BaseDataSource<T> {
  public dataSource: PrismaClient;
  public tableName: string;

  constructor(dataSource: PrismaClient, tableName: string) {
    super();
    this.dataSource = dataSource;
    this.tableName = tableName;
  }

  async create(item: T): Promise<T> {
    try {
      const createdItem = await this.dataSource[this.tableName as any].create({ data: item });
      return createdItem as T;
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
      return foundItems as T[];
    } catch (error) {
      console.error("Error finding items:", error);
      throw error;
    }
  }

  async findOne(id: string): Promise<T | null> {
    try {
      const foundItem: T | null = await this.dataSource[this.tableName as any].findUnique({ where: { id } });
      return foundItem ? (foundItem as T) : null;
    } catch (error) {
      console.error("Error finding item:", error);
      throw error;
    }
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    try {
      const updatedItem: T | null = await this.dataSource[this.tableName as any].update({ where: { id }, data: item });
      return updatedItem as T | null;
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  }

  findMany(): Promise<T[]> {
    try {
      const items: Promise<T[]> = this.dataSource[this.tableName as any].findMany();
      return items;
    } catch (error) {
      console.error("Error finding items:", error);
      throw error;
    }
  }
}
