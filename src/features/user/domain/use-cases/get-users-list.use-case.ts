import { UserRepositoryImpl } from "../../infrastructure/repository-implementation/user-repository-impl";
import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { UserListDto } from "../dtos/user-list.dto";

export class GetUserListUseCase {
  repository = new UserRepositoryImpl();

  async execute(): Promise<ApiResponse<UserListDto[] | null>> {
    const users = await this.repository.getUsersList();

    if (!users) {
      return ApiResponse.notFound({
        message: "Users not found",
        errors: ["Users not found"],
      });
    }

    return ApiResponse.success({
      data: users.map((user) => UserListDto.create(user)),
      message: "Usuarios obtenidos con exito",
      statusCode: 200,
    });
  }
}
