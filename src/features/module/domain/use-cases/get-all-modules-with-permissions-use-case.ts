import { ModuleRepositoryImpl } from "../../infrastructure/repository-implementation/module.repository.impl";
import { ModuleWithPermissionsDto } from "../dtos/modules-with-permissions-dto";

export class GetAllModulesWithPermissionsUseCase {
  private repository: ModuleRepositoryImpl;

  constructor() {
    this.repository = new ModuleRepositoryImpl();
  }

  async execute(): Promise<ModuleWithPermissionsDto[]> {
    const modules = await this.repository.getModulesWithPermissions();

    const dto = modules?.map((module) => {
      return ModuleWithPermissionsDto.create(module);
    });

    return dto || [];
  }
}
