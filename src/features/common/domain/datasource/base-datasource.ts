import { IRead } from "../repository-generics/iRead";
import { IWrite } from "../repository-generics/iWrite.interface";

export abstract class BaseDataSource<T> implements IRead<T>, IWrite<T> {
  abstract tableName: string;
  abstract find(item: T): Promise<T[]>;
  abstract findOne(id: string): Promise<T | null>;
  abstract create(item: T): Promise<T>;
  abstract update(id: string, item: T): Promise<T | null>;
  abstract delete(id: string): Promise<boolean>;
  abstract findMany(): Promise<T[]>;
}
