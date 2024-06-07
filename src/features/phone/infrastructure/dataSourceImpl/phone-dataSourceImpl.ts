import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { db } from "@/lib/db/db";
import { PhoneEntity } from "../../domain/entities/phone.entity";

export class PhoneSourceImpl extends BaseDataSourceImpl<PhoneEntity> {
  constructor() {
    super(PhoneEntity);
  }

  async getAllPhones(): Promise<PhoneEntity[] | null> {
    const phones = await db.phone.findMany();

    return phones.map((phone) => PhoneEntity.create(phone));
  }
}
