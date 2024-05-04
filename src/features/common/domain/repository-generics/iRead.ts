export abstract class IRead<T> {
  abstract find(item: T): Promise<T[]>;
  abstract findOne(id: any): Promise<T | null>;
}
