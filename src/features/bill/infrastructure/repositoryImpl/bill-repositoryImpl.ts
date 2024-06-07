import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { BillSourceImpl } from "../dataSourceImpl/bill-dataSourceImpl";
import { BillEntity } from "../../domain/entities/bill-entity";

export class BillRepositoryImpl extends BaseRepositoryImpl<BillEntity> {
  constructor() {
    super(new BillSourceImpl());
  }

  getAllBills(): Promise<BillEntity[] | null> {
    return (this.dataSource as BillSourceImpl).getAllBills();
  }
}
