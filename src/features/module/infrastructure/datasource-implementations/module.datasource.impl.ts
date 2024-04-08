import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { ModuleEntity } from "../../domain/entities/module.entity";
import { db } from "@/lib/db/db";

export class ModuleDataSourceImpl extends BaseDataSourceImpl<ModuleEntity> {
  constructor() {
    super(ModuleEntity);
  }

  async getModulesByUserId(userId: number): Promise<ModuleEntity[] | null> {
    const result = await db.module.findMany({
      where: {
        id: userId,
      },
    });

    if (!result) {
      return null;
    }

    const created = result.map((module) => {
      return ModuleEntity.create(module);
    });

    return created;
  }

  async getModulesWithPermissions() {
    const result = await db.module.findMany({
      include: {
        modulePermissions: true,
      },
    });

    if (!result) {
      return null;
    }

    const created = result.map((module) => {
      return ModuleEntity.create(module);
    });

    return created;
  }
}
