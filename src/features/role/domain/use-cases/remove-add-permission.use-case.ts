import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { RoleRepositoryImpl } from "../../infrastructure/repository-implementation/role.repositoryImpl";
import { ModulePermissionRepositoryImpl } from "@/features/modulePermission/infrastructure/repository-implementation/modulePermission.repositoryImpl";

export class RemoveOrAddPermissionUseCase {
  private repository: RoleRepositoryImpl;
  private permissionsRepository: ModulePermissionRepositoryImpl;

  constructor() {
    this.repository = new RoleRepositoryImpl();
    this.permissionsRepository = new ModulePermissionRepositoryImpl();
  }

  async execute(roleId: number, permissionsId: number[], action: "add" | "remove"): Promise<ApiResponse<boolean>> {
    let result = true;

    const permissionsExists = await this.permissionsRepository.checkIfPermissionsExists(permissionsId);

    if (!permissionsExists) {
      return ApiResponse.badRequest({
        message: "Alguno de los permisos no existe",
        errors: ["Alguno de los permisos no existe"],
      });
    }

    const roleExists = await this.repository.roleExists(roleId);

    if (!roleExists) {
      return ApiResponse.notFound({
        message: "El rol no existe",
        errors: ["El rol no existe"],
      });
    }

    if (action === "add") {
      result = await this.repository.addPermissionToRole(roleId, permissionsId);
    }

    if (action === "remove") {
      result = await this.repository.deletePermissionFromRole(roleId, permissionsId);
    }

    return ApiResponse.success({
      data: result,
      message: "Permisos actualizados correctamente",
      statusCode: 200,
    });
  }
}
