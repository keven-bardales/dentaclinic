import { BaseRepository } from "@/features/common/domain/repositories/base-repository";
import { ModuleEntity } from "../entities/module.entity";

export type IGetAllModulesUseCase = {
  execute(): Promise<ModuleEntity[]>;
};

export class GetAllModulesUseCase implements IGetAllModulesUseCase {
  constructor(private readonly repository: BaseRepository<ModuleEntity>) {}

  async execute(): Promise<ModuleEntity[]> {
    const modules = await this.repository.findMany();

    return modules;
  }
}
