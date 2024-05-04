import { ModuleEntity } from "../entities/module.entity";
import { ModuleRepositoryImpl } from "../../infrastructure/repository-implementation/module.repository.impl";

export class GetAllModulesUseCase {
  private repository = new ModuleRepositoryImpl();

  constructor() {}

  async execute(): Promise<ModuleEntity[]> {
    const modules = await this.repository.findMany();

    return modules;
  }
}
