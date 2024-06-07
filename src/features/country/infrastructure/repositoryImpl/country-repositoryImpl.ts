import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { CountryEntity } from "../../domain/entities/city.entity";
import { CountrySourceImpl } from "../dataSourceImpl/country-dataSourceImpl";

export class CountryRepositoryImpl extends BaseRepositoryImpl<CountryEntity> {
  constructor() {
    super(new CountrySourceImpl());
  }

  getAllCountries(): Promise<CountryEntity[] | null> {
    return (this.dataSource as CountrySourceImpl).getAllCountries();
  }
}
