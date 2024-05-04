import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { ModuleEntity } from "../../domain/entities/module.entity";
import { db } from "@/lib/db/db";
import { CreateModulePayloadWithPermissions } from "../../domain/interfaces/create-module-payload.interface";

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

  async getModuleByName(name: string): Promise<ModuleEntity | null> {
    const result = await db.module.findFirst({
      where: {
        name,
      },
    });

    if (!result) {
      return null;
    }

    return ModuleEntity.create(result);
  }

  async createModuleWithDefaultPermissions(payload: CreateModulePayloadWithPermissions): Promise<ModuleEntity | null> {
    const result = await db.module.create({
      data: {
        name: payload.name,
        description: payload.description,
        modulePermissions: {
          createMany: {
            data: payload.permissions,
          },
        },
      },
    });

    if (!result) {
      return null;
    }

    return ModuleEntity.create(result);
  }
}
