import { ModuleEntity } from "../entities/module.entity";

export class ModuleDto {
  constructor(public id: ModuleEntity["id"], public name: ModuleEntity["name"], public description: ModuleEntity["description"]) {}

  static create(module: ModuleEntity): ModuleDto {
    return new ModuleDto(module.id, module.name, module.description);
  }
}
