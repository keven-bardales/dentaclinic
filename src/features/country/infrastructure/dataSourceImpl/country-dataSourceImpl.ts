import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { db } from "@/lib/db/db";
import { CountryEntity } from "../../domain/entities/city.entity";

export class CountrySourceImpl extends BaseDataSourceImpl<CountryEntity> {
  constructor() {
    super(CountryEntity);
  }

  async getAllCountries(): Promise<CountryEntity[] | null> {
    const countries = await db.country.findMany({
      include: {
        states: true,
        Address: true,
      },
    });

    return countries.map((country) => {
      return CountryEntity.create(country);
    });
  }
}
