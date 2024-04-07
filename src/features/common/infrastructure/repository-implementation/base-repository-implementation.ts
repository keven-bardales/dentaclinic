import { BaseRepository } from "../../domain/repositories/base-repository";
import { BaseDataSource } from "../../domain/datasource/base-datasource";

export class BaseRepositoryImpl<T> extends BaseRepository<T> {
  constructor(public dataSource: BaseDataSource<T>) {
    super();
  }

  create(item: T): Promise<T | null> {
    return this.dataSource.create(item);
  }

  delete(id: any): Promise<boolean> {
    return this.dataSource.delete(id);
  }

  find(item: T): Promise<T[]> {
    return this.dataSource.find(item);
  }

  findOne(id: any): Promise<T | null> {
    return this.dataSource.findOne(id);
  }

  update(id: any, item: T): Promise<T | null> {
    return this.dataSource.update(id, item);
  }

  findMany(): Promise<T[]> {
    return this.dataSource.findMany();
  }
}
