import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { AddressEntity } from "../../domain/entities/address.entity";
import { AddressSourceImpl } from "../dataSourceImpl/address-dataSourceImpl";

export class AddressRepositoryImpl extends BaseRepositoryImpl<AddressEntity> {
  constructor() {
    super(new AddressSourceImpl());
  }

  getAllAddresses(): Promise<AddressEntity[] | null> {
    return (this.dataSource as AddressSourceImpl).getAllAddresses();
  }
}
