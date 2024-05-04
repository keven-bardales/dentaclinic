import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { ModuleEntity } from "../../domain/entities/module.entity";
import { ModuleDataSourceImpl } from "../datasource-implementations/module.datasource.impl";
import { CreateModulePayloadWithPermissions } from "../../domain/interfaces/create-module-payload.interface";

export class ModuleRepositoryImpl extends BaseRepositoryImpl<ModuleEntity> {
  constructor() {
    super(new ModuleDataSourceImpl());
  }

  async getModulesByUserId(userId: number): Promise<ModuleEntity[] | null> {
    return (this.dataSource as ModuleDataSourceImpl).getModulesByUserId(userId);
  }

  async getModulesWithPermissions() {
    return (this.dataSource as ModuleDataSourceImpl).getModulesWithPermissions();
  }

  async getModuleByName(name: string): Promise<ModuleEntity | null> {
    return (this.dataSource as ModuleDataSourceImpl).getModuleByName(name);
  }

  async createModuleWithDefaultPermissions(payload: CreateModulePayloadWithPermissions): Promise<ModuleEntity | null> {
    return (this.dataSource as ModuleDataSourceImpl).createModuleWithDefaultPermissions(payload);
  }
}
