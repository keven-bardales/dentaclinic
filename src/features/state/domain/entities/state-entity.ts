import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { AddressEntity } from "@/features/address/domain/entities/address.entity";
import { CountryEntity } from "@/features/country/domain/entities/city.entity";
import { CityEntity } from "@/features/city/domain/entities/city.entity";

export class StateEntity extends BaseEntity {
  static tableName = "state";

  constructor(
    public id: number,
    public name: string,
    public code: string,
    public countryId: number,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public country: CountryEntity,
    public cities: CityEntity[],
    public addresses: AddressEntity[]
  ) {
    super(id, createdAt, updatedAt, StateEntity.tableName);

    this.name = name;
    this.code = code;
    this.countryId = countryId;
    this.country = country;
    this.cities = cities;
    this.addresses = addresses;
  }

  static create(obj: any) {
    return new StateEntity(
      obj.id,
      obj.name,
      obj.code,
      obj.countryId,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.country,
      obj.cities,
      obj.addresses
    );
  }

  toObject(): any {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      countryId: this.countryId,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      country: this.country.toObject(),
      cities: this.cities.map((city) => city.toObject()),
      addresses: this.addresses.map((address) => address.toObject()),
    };
  }
}
