import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { StateEntity } from "../../domain/entities/state-entity";
import { StateSourceImpl } from "../dataSourceImpl/state-dataSourceImpl";

export class StateRepositoryImpl extends BaseRepositoryImpl<StateEntity> {
  constructor() {
    super(new StateSourceImpl());
  }

  getAllStates(): Promise<StateEntity[] | null> {
    return (this.dataSource as StateSourceImpl).getAllStates();
  }
}
