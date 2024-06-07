import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { db } from "@/lib/db/db";
import { AddressEntity } from "../../domain/entities/address.entity";

export class AddressSourceImpl extends BaseDataSourceImpl<AddressEntity> {
  constructor() {
    super(AddressEntity);
  }

  async getAllAddresses(): Promise<AddressEntity[] | null> {
    const addresses = await db.address.findMany({
      include: {
        city: true,
        state: true,
        country: true,
      },
    });

    return addresses.map((address) => AddressEntity.create(address));
  }
}
