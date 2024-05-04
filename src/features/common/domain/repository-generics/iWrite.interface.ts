export abstract class IWrite<T> {
  abstract create(item: T): Promise<T | null>;

  abstract update(id: any, item: T): Promise<T | null>;

  abstract delete(id: any): Promise<boolean>;
}
