import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { ModuleEntity } from "@/features/module/domain/entities/module.entity";
import { GetAllModulesUseCase } from "@/features/module/domain/use-cases/get-all-modules.use-case";
import { db } from "@/lib/db/db";

export const getModules = async () => {
  const dataSource = new BaseDataSourceImpl<ModuleEntity>(db, "module");
  const repository = new BaseRepositoryImpl<ModuleEntity>(dataSource);
  const useCase = new GetAllModulesUseCase(repository);

  const modules = await useCase.execute();

  console.log(modules);

  return modules;
};
