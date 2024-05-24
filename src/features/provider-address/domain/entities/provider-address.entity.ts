import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { AddressEntity } from "@/features/address/domain/entities/address.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { ProviderEntity } from "@/features/provider/domain/entity/provider.entity";

export class ProviderAddressEntity extends BaseEntity {
  static tableName = "provider_address";

  constructor(
    public id: number,
    public providerId: string,
    public addressId: number,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public provider: ProviderEntity,
    public address: AddressEntity
  ) {
    super(id, createdAt, updatedAt, ProviderAddressEntity.tableName);

    this.providerId = providerId;
    this.addressId = addressId;
    this.provider = provider;
    this.address = address;
  }

  static create(obj: any) {
    return new ProviderAddressEntity(
      obj.id,
      obj.providerId,
      obj.addressId,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.provider,
      obj.address
    );
  }

  toObject(): any {
    return {
      id: this.id,
      providerId: this.providerId,
      addressId: this.addressId,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      provider: this.provider.toObject(),
      address: this.address.toObject(),
    };
  }
}
