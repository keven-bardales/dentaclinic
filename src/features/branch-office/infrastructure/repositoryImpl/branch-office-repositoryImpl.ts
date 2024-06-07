import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { BranchOfficeSourceImpl } from "../dataSourceImpl/branch-office-dataSourceImpl";
import { BranchOfficeEntity } from "../../domain/entities/branch-office.entity";

export class BranchOfficeRepositoryImpl extends BaseRepositoryImpl<BranchOfficeEntity> {
  constructor() {
    super(new BranchOfficeSourceImpl());
  }

  getAllBranchOffices(): Promise<BranchOfficeEntity[] | null> {
    return (this.dataSource as BranchOfficeSourceImpl).getAllBranchOffices();
  }
}
