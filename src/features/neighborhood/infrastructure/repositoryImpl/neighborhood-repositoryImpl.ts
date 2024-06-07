import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { NeighborhoodEntity } from "../../domain/entities/neighborhood.entity";
import { NeighborhoodSourceImpl } from "../dataSourceImpl/neighborhood-dataSourceImpl";

export class NeighborhoodRepositoryImpl extends BaseRepositoryImpl<NeighborhoodEntity> {
  constructor() {
    super(new NeighborhoodSourceImpl());
  }

  getAllNeighborhoods(): Promise<NeighborhoodEntity[] | null> {
    return (this.dataSource as NeighborhoodSourceImpl).getAllNeighborhoods();
  }
}
