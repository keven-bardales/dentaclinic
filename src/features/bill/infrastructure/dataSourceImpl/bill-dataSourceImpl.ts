import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { db } from "@/lib/db/db";
import { BillEntity } from "../../domain/entities/bill-entity";

export class BillSourceImpl extends BaseDataSourceImpl<BillEntity> {
  constructor() {
    super(BillEntity);
  }

  async getAllBills(): Promise<BillEntity[] | null> {
    const bills = await db.bill.findMany({
      include: {
        customer: true,
        branchOffice: true,
      },
    });

    return bills.map((bill) => {
      return BillEntity.create(bill);
    });
  }
}
