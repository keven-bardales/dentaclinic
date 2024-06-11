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

  async getById(id: number) {
    const quotation = await db.quotation.findUnique({
      where: {
        id,
      },
      include: {
        customer: true,
        branchOffice: {
          include: {
            address: true,
            company: true,
            branchOfficeFaxes: {
              include: {
                fax: true,
              },
            },
            branchOfficePhones: {
              include: {
                phone: true,
              },
            },
          },
        },
        quotationDetails: {
          include: {
            product: {
              include: {
                category: {
                  include: {
                    parent: true,
                  },
                },
              },
            },
            quotationDetailDiscountCode: {
              include: {
                discountCode: true,
              },
            },
            quotationDetailTax: {
              include: {
                tax: true,
              },
            },
          },
        },
      },
    });

    if (!quotation) {
      return null;
    }

    return QuotationEntity.create(quotation);
  }
}
