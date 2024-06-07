import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { db } from "@/lib/db/db";
import { CompanyEntity } from "../../domain/entities/company.entitity";

export class CompanySourceImpl extends BaseDataSourceImpl<CompanyEntity> {
  constructor() {
    super(CompanyEntity);
  }

  async getAllCompanies(): Promise<CompanyEntity[] | null> {
    const companies = await db.company.findMany({
      include: {
        branches: true,
        CompanyFaxes: true,
        CompanyPhones: true,
      },
    });

    return companies.map((company) => {
      return CompanyEntity.create(company);
    });
  }
}
