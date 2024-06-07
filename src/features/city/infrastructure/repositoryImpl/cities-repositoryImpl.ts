import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { CityEntity } from "../../domain/entities/city.entity";
import { CitySourceImpl } from "../dataSourceImpl/cities-dataSourceImpl";

export class CityRepositoryImpl extends BaseRepositoryImpl<CityEntity> {
  constructor() {
    super(new CitySourceImpl());
  }

  getAllCities(): Promise<CityEntity[] | null> {
    return (this.dataSource as CitySourceImpl).getAllCities();
  }
}
