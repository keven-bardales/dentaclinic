import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { db } from "@/lib/db/db";
import { BranchOfficeEntity } from "../../domain/entities/branch-office.entity";

export class BranchOfficeSourceImpl extends BaseDataSourceImpl<BranchOfficeEntity> {
  constructor() {
    super(BranchOfficeEntity);
  }

  async getAllBranchOffices(): Promise<BranchOfficeEntity[] | null> {
    const branchOffices = await db.branchOffice.findMany({
      include: {
        address: true,
        BranchOfficePhones: true,
      },
    });

    return branchOffices.map((branchOffice) => {
      return BranchOfficeEntity.create(branchOffice);
    });
  }
}
