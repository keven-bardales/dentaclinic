import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { CustomerEntity } from "../../domain/entities/customer.entity";
import { CustomerSourceImpl } from "../dataSourceImpl/customer-dataSourceImpl";

export class CustomerRepositoryImpl extends BaseRepositoryImpl<CustomerEntity> {
  constructor() {
    super(new CustomerSourceImpl());
  }

  getAllCustomers(): Promise<CustomerEntity[] | null> {
    return (this.dataSource as CustomerSourceImpl).getAllCustomers();
  }
}
