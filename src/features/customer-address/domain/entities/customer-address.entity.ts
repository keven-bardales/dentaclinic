import { BaseEntity } from "@/features/common/domain/entities/base.entity";
import { CustomerEntity } from "@/features/customer/domain/entities/customer.entity";
import { AddressEntity } from "@/features/address/domain/entities/address.entity";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";

export class CustomerAddressEntity extends BaseEntity {
  static tableName = "customer_address";

  constructor(
    public id: number,
    public customerId: string,
    public addressId: number,
    public createdAt: DateWrapper,
    public updatedAt: DateWrapper,
    public customer: CustomerEntity,
    public address: AddressEntity
  ) {
    super(id, createdAt, updatedAt, CustomerAddressEntity.tableName);

    this.customerId = customerId;
    this.addressId = addressId;
    this.customer = customer;
    this.address = address;
  }

  static create(obj: any) {
    return new CustomerAddressEntity(
      obj.id,
      obj.customerId,
      obj.addressId,
      new DateWrapper(obj.createdAt),
      new DateWrapper(obj.updatedAt),
      obj.customer,
      obj.address
    );
  }

  toObject(): any {
    return {
      id: this.id,
      customerId: this.customerId,
      addressId: this.addressId,
      createdAt: this.createdAt.toObject(),
      updatedAt: this.updatedAt.toObject(),
      customer: this.customer.toObject(),
      address: this.address.toObject(),
    };
  }
}
