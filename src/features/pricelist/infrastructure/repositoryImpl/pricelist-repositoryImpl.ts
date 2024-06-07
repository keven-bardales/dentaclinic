import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { PriceListEntity } from "../../domain/entities/pricelist.entity";
import { PriceListSourceImpl } from "../dataSourceImpl/pricelist-dataSourceImpl";

export class PriceListRepositoryImpl extends BaseRepositoryImpl<PriceListEntity> {
  constructor() {
    super(new PriceListSourceImpl());
  }

  getAllPriceLists(): Promise<PriceListEntity[] | null> {
    return (this.dataSource as PriceListSourceImpl).getAllPriceLists();
  }
}
