import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { PhoneEntity } from "../../domain/entities/phone.entity";
import { PhoneSourceImpl } from "../dataSourceImpl/phone-dataSourceImpl";

export class PhoneRepositoryImpl extends BaseRepositoryImpl<PhoneEntity> {
  constructor() {
    super(new PhoneSourceImpl());
  }

  getAllPhones(): Promise<PhoneEntity[] | null> {
    return (this.dataSource as PhoneSourceImpl).getAllPhones();
  }
}
