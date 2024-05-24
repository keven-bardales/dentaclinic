import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { QuotationSourceImpl } from "../data-source-implementations/quotation.datasourceImpl";
import { QuotationEntity } from "../../domain/entities/quotation.entity";

export class QuotationRepositoryImpl extends BaseRepositoryImpl<QuotationEntity> {
  constructor() {
    super(new QuotationSourceImpl());
  }

  getAllQuotations(): Promise<QuotationEntity[] | null> {
    return (this.dataSource as QuotationSourceImpl).getAllQuotations();
  }

  getById(id: number): Promise<QuotationEntity | null> {
    return (this.dataSource as QuotationSourceImpl).getById(id);
  }
}
