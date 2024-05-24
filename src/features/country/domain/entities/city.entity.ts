import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { AddressEntity } from "@/features/address/domain/entities/address.entity";
import { StateEntity } from "@/features/state/domain/entities/state-entity";

export class CountryEntity extends BaseEntity {
  static tableName = "country";

  constructor(
    public id: number,
    public name: string,
    public code: string,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public states: StateEntity[],
    public addresses: AddressEntity[]
  ) {
    super(id, createdAt, updatedAt, CountryEntity.tableName);

    this.name = name;
    this.code = code;
    this.states = states;
    this.addresses = addresses;
  }

  static create(obj: any) {
    return new CountryEntity(obj.id, obj.name, obj.code, new DateWrapper(obj.createdAt), new DateWrapper(obj.updatedAt), obj.states, obj.addresses);
  }

  toObject(): any {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      states: this.states.map((state) => state.toObject()),
      addresses: this.addresses.map((address) => address.toObject()),
    };
  }
}
