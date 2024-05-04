import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { RoleRepositoryImpl } from "../../infrastructure/repository-implementation/role.repositoryImpl";
import { RoleWithUsersPermissionsCountDto } from "../dtos/roleWithUsersPermissionsCount.dto";

export class GetAllRolesUseCase {
  private repository: RoleRepositoryImpl;

  constructor() {
    this.repository = new RoleRepositoryImpl();
  }

  async execute(): Promise<ApiResponse<RoleWithUsersPermissionsCountDto[]>> {
    const roles = await this.repository.getAllRolesWithPermissionsAndUsersCount();

    if (!roles) {
      return ApiResponse.success({
        data: [],
        message: "No se encontraron roles",
        statusCode: 200,
      });
    }

    if (roles?.length == 0) {
      return ApiResponse.success({
        data: [],
        message: "No se encontraron roles",
        statusCode: 200,
      });
    }

    const dto: RoleWithUsersPermissionsCountDto[] = roles.map((role) => {
      return RoleWithUsersPermissionsCountDto.create(role);
    });

    return ApiResponse.success({
      data: dto,
      message: "Roles encontrados",
      statusCode: 200,
    });
  }
}
