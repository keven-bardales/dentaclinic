import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { db } from "@/lib/db/db";
import { CustomerEntity } from "../../domain/entities/customer.entity";

export class CustomerSourceImpl extends BaseDataSourceImpl<CustomerEntity> {
  constructor() {
    super(CustomerEntity);
  }

  async getAllCustomers(): Promise<CustomerEntity[] | null> {
    const customers = await db.customer.findMany({
      include: {
        quotes: true,
        customerPhones: true,
        customerAdress: true,
      },
    });

    return customers.map((customer) => {
      return CustomerEntity.create(customer);
    });
  }
}
