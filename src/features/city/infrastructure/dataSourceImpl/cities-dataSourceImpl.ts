import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { db } from "@/lib/db/db";
import { CityEntity } from "../../domain/entities/city.entity";

export class CitySourceImpl extends BaseDataSourceImpl<CityEntity> {
  constructor() {
    super(CityEntity);
  }

  async getAllCities(): Promise<CityEntity[] | null> {
    const cities = await db.city.findMany({
      include: {
        state: {
          include: {
            country: true,
          },
        },
        neighborhoods: true,
      },
    });

    return cities.map((city) => CityEntity.create(city));
  }
}
