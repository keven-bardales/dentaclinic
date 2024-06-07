import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { CompanyEntity } from "../../domain/entities/company.entitity";
import { CompanySourceImpl } from "../dataSourceImpl/company-dataSourceImpl";

export class CompanyRepositoryImpl extends BaseRepositoryImpl<CompanyEntity> {
  constructor() {
    super(new CompanySourceImpl());
  }

  getAllCompanies(): Promise<CompanyEntity[] | null> {
    return (this.dataSource as CompanySourceImpl).getAllCompanies();
  }
}
