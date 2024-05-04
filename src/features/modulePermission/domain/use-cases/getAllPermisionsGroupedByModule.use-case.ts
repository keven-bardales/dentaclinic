import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { ModulePermissionRepositoryImpl } from "../../infrastructure/repository-implementation/modulePermission.repositoryImpl";
import { PermissionsGroupedByModuleDto } from "../dtos/permissionsgroupedByModule.dto";
import { ModuleEntity } from "@/features/module/domain/entities/module.entity";

export class GetAllPermissionsGroupedByModuleUseCase {
  private repository: ModulePermissionRepositoryImpl;

  constructor() {
    this.repository = new ModulePermissionRepositoryImpl();
  }

  async execute(): Promise<ApiResponse<PermissionsGroupedByModuleDto[]>> {
    const modulePermissions = await this.repository.getAllPermissionsWithModule();

    if (!modulePermissions) {
      return ApiResponse.success({
        data: [],
        message: "No se encontraron permisos",
        statusCode: 200,
      });
    }

    const dto: PermissionsGroupedByModuleDto[] = [];

    modulePermissions?.forEach((modulePermission) => {
      const foundModule = dto.find((module) => module.moduleId === modulePermission.moduleId);

      if (!foundModule) {
        const dtoToAdd = PermissionsGroupedByModuleDto.create(modulePermission.module as ModuleEntity, modulePermissions);

        dto.push(dtoToAdd);
      }
    });

    if (modulePermissions?.length == 0) {
      return ApiResponse.success({
        data: [],
        message: "No se encontraron permisos",
        statusCode: 200,
      });
    }

    return ApiResponse.success({
      data: dto,
      message: "Roles encontrados",
      statusCode: 200,
    });
  }
}
