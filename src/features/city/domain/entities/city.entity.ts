import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { AddressEntity } from "@/features/address/domain/entities/address.entity";
import { StateEntity } from "@/features/state/domain/entities/state-entity";
import { NeighborhoodEntity } from "@/features/neighborhood/domain/entities/neighborhood.entity";

export class CityEntity extends BaseEntity {
  static tableName = "city";

  constructor(
    public id: number,
    public name: string,
    public code: string,
    public stateId: number,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public state: StateEntity,
    public neighborhoods: NeighborhoodEntity[],
    public addresses: AddressEntity[]
  ) {
    super(id, createdAt, updatedAt, CityEntity.tableName);

    this.name = name;
    this.code = code;
    this.stateId = stateId;
    this.state = state;
    this.neighborhoods = neighborhoods;
    this.addresses = addresses;
  }

  static create(obj: any) {
    return new CityEntity(
      obj.id,
      obj.name,
      obj.code,
      obj.stateId,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.state,
      obj.neighborhoods,
      obj.addresses
    );
  }

  toObject(): any {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      stateId: this.stateId,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      state: this.state.toObject(),
      neighborhoods: this.neighborhoods.map((neighborhood) => neighborhood.toObject()),
      addresses: this.addresses.map((address) => address.toObject()),
    };
  }
}
