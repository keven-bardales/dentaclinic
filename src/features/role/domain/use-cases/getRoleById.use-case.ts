import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { RoleRepositoryImpl } from "../../infrastructure/repository-implementation/role.repositoryImpl";
import { RoleWithUsersAndPermissionsIdsDto } from "../dtos/roleWithUsersAndPermissions.dto";

export class GetRoleByIdWithUsersAndPermissionsUseCase {
  private repository: RoleRepositoryImpl;

  constructor() {
    this.repository = new RoleRepositoryImpl();
  }

  async execute(roleId: number): Promise<ApiResponse<RoleWithUsersAndPermissionsIdsDto | null>> {
    const role = await this.repository.getRoleByIdWithUsersAndPermissions(roleId);

    if (!role) {
      return ApiResponse.success({
        data: null,
        message: "No se encontro el rol solicitado",
        statusCode: 200,
      });
    }

    const dto: RoleWithUsersAndPermissionsIdsDto = RoleWithUsersAndPermissionsIdsDto.create(role);

    return ApiResponse.success({
      data: dto,
      message: "Roles encontrados",
      statusCode: 200,
    });
  }
}
