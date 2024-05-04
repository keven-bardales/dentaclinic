import { PrismaClient } from "@prisma/client/extension";
import { IRead } from "../repository-generics/iRead";
import { IWrite } from "../repository-generics/iWrite.interface";

export abstract class BaseRepository<T> implements IRead<T>, IWrite<T> {
  abstract find(item: T): Promise<T[]>;
  abstract findOne(id: any): Promise<T | null>;
  abstract create(item: T): Promise<T | null>;
  abstract update(id: any, item: T): Promise<T | null>;
  abstract delete(id: any): Promise<boolean>;
  abstract findMany(): Promise<T[]>;
}
