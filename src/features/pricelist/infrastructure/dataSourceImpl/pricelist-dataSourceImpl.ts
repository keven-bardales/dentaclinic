import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { db } from "@/lib/db/db";
import { PriceListEntity } from "../../domain/entities/pricelist.entity";

export class PriceListSourceImpl extends BaseDataSourceImpl<PriceListEntity> {
  constructor() {
    super(PriceListEntity);
  }

  async getAllPriceLists(): Promise<PriceListEntity[] | null> {
    const priceLists = await db.priceList.findMany({
      include: {
        priceList: true,
      },
    });

    return priceLists.map((priceList) => {
      return PriceListEntity.create(priceList);
    });
  }
}
