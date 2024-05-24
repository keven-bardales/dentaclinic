import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { db } from "@/lib/db/db";
import { QuotationEntity } from "../../domain/entities/quotation.entity";

export class QuotationSourceImpl extends BaseDataSourceImpl<QuotationEntity> {
  constructor() {
    super(QuotationEntity);
  }

  async getAllQuotations() {
    const quotations = await db.quotation.findMany({
      include: {
        customer: true,
        branchOffice: true,
      },
    });

    if (!quotations) {
      return null;
    }

    return quotations.map((quotation) => QuotationEntity.create(quotation));
  }
}
