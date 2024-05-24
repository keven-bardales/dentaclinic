import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { PhoneEntity } from "@/features/phone/domain/entities/phone.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { ProviderAddressEntity } from "@/features/provider-address/domain/entities/provider-address.entity";

export class ProviderEntity extends BaseEntity {
  static tableName = "provider";

  constructor(
    public id: string,
    public name: string,
    public lastName: string,
    public fullName: string,
    public phone: PhoneEntity[],
    public providerAddress: ProviderAddressEntity[],
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper
  ) {
    super(id, createdAt, updatedAt, ProviderEntity.tableName);

    this.name = name;
    this.lastName = lastName;
    this.fullName = fullName;
    this.phone = phone;
    this.providerAddress = providerAddress;
  }

  static create(obj: any) {
    return new ProviderEntity(
      obj.id,
      obj.name,
      obj.lastName,
      obj.fullName,
      obj.phone,
      obj.providerAddress,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt)
    );
  }

  toObject(): any {
    return {
      id: this.id,
      name: this.name,
      lastName: this.lastName,
      fullName: this.fullName,
      phone: this.phone.map((phone) => phone.toObject()),
      providerAddress: this.providerAddress.map((address) => address.toObject()),
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
    };
  }
}
