import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { CityEntity } from "@/features/city/domain/entities/city.entity";
import { AddressEntity } from "@/features/address/domain/entities/address.entity";

export class NeighborhoodEntity extends BaseEntity {
  static tableName = "neighborhood";

  constructor(
    public id: number,
    public name: string,
    public code: string,
    public cityId: number,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public city: CityEntity,
    public addresses: AddressEntity[]
  ) {
    super(id, createdAt, updatedAt, NeighborhoodEntity.tableName);

    this.name = name;
    this.code = code;
    this.cityId = cityId;
    this.city = city;
    this.addresses = addresses;
  }

  static create(obj: any) {
    return new NeighborhoodEntity(
      obj.id,
      obj.name,
      obj.code,
      obj.cityId,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.city,
      obj.addresses
    );
  }

  toObject(): any {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      cityId: this.cityId,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      city: this.city.toObject(),
      addresses: this.addresses.map((address) => address.toObject()),
    };
  }
}
