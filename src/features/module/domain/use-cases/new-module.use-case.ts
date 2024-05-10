import { baseValidator } from "@/features/common/validators/base.validator";
import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { ModuleRepositoryImpl } from "../../infrastructure/repository-implementation/module.repository.impl";
import { CreateModulePayload, CreateModulePayloadWithPermissions } from "../interfaces/create-module-payload.interface";
import { ModuleDto } from "../dtos/module.dto";
import { newModuleSchema } from "../schemas/new-module-schema";

export class NewModuleUseCase {
  repository = new ModuleRepositoryImpl();

  async execute(payload: CreateModulePayload): Promise<ApiResponse<ModuleDto | null>> {
    const validationResult = baseValidator(newModuleSchema, payload);

    if (!validationResult.success) {
      return ApiResponse.badRequest({
        message: null,
        errors: validationResult.errors,
      });
    }

    const existingModule = await this.repository.getModuleByName(payload.name);

    if (existingModule) {
      return ApiResponse.notFound({
        errors: ["Módulo ya existe"],
        message: null,
      });
    }

    const payloadWithDefaultPermissions: CreateModulePayloadWithPermissions = {
      ...payload,
      permissions: [
        {
          name: `Ver ${payload.name}`,
        },
        {
          name: `Crear ${payload.name}`,
        },
        {
          name: `Editar ${payload.name}`,
        },
        {
          name: `Eliminar ${payload.name}`,
        },
      ],
    };

    const createdModule = await this.repository.createModuleWithDefaultPermissions(payloadWithDefaultPermissions);

    if (!createdModule) {
      return ApiResponse.internalServerError({
        errors: ["Error al crear módulo"],
        message: null,
      });
    }

    return ApiResponse.success({
      data: ModuleDto.create(createdModule),
      message: "Módulo creado exitosamente",
      statusCode: 201,
    });
  }
}
