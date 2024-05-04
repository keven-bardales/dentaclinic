import { ModuleEntity } from "../entities/module.entity";

export interface CreateModulePayload {
  name: ModuleEntity["name"];
  description: ModuleEntity["description"];
}

export type CreateModulePayloadWithPermissions = CreateModulePayload & {
  permissions: {
    name: ModuleEntity["name"];
  }[];
};
