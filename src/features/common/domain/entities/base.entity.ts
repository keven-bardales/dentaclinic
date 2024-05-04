import { DateWrapper } from "../../wrappers/date-wrraper";

export class BaseEntity {
  constructor(public id: any, public createdAt: DateWrapper, public updatedAt: DateWrapper, public tableName: string) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.tableName = tableName;
  }

  static create(obj: any) {
    return new BaseEntity(obj.id, new DateWrapper(obj.createdAt), new DateWrapper(obj.updatedAt), obj.tableName);
  }
}
