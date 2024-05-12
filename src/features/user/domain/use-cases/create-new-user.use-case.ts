import { bcryptAdapter } from "@/features/common/adapters/bcryptjs.adapter";
import { UserRepositoryImpl } from "../../infrastructure/repository-implementation/user-repository-impl";
import { LoggedInUserDto } from "../dtos/logged-in-user-dto";
import { baseValidator } from "@/features/common/validators/base.validator";
import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { newUserSchema } from "../schemas/new-user.schema";
import { CreateUserDto } from "../dtos/create-user.dto";
import { RoleRepositoryImpl } from "@/features/role/infrastructure/repository-implementation/role.repositoryImpl";
import { UserEntity } from "../entities/user.entity";
import { CreatedUserDto } from "../dtos/created-user.dto";

export class CreateUserUseCase {
  repository = new UserRepositoryImpl();
  roleRepository = new RoleRepositoryImpl();

  async execute(payload: CreateUserDto): Promise<ApiResponse<CreatedUserDto | null>> {
    const validationResult = baseValidator(newUserSchema, {
      email: payload.email,
      password: payload.password,
      name: payload.name,
      userRoles: payload.userRoles,
    });

    if (!validationResult.success) {
      return ApiResponse.badRequest({
        message: null,
        errors: validationResult.errors,
      });
    }

    const user = await this.repository.getUserByEmail(payload.email);

    if (user) {
      return ApiResponse.notFound({
        errors: ["Usuario ya existe"],
        message: null,
      });
    }

    const roleExists = await this.roleRepository.checkRoleIds(payload.userRoles);

    if (!roleExists) {
      return ApiResponse.notFound({
        errors: ["Alguno de los roles no existe"],
        message: null,
      });
    }

    const hashedPassword = await bcryptAdapter.hash(payload.password);

    validationResult.validatedFields.password = hashedPassword;

    const creationDto = CreateUserDto.create(
      validationResult.validatedFields.email,
      hashedPassword,
      validationResult.validatedFields.name,
      validationResult.validatedFields.userRoles
    );

    const result = await this.repository.createNewUser(creationDto);

    if (!result) {
      return ApiResponse.internalServerError({
        errors: ["Error al crear usuario"],
        message: null,
      });
    }

    return ApiResponse.success({
      data: CreatedUserDto.create(result),
      message: "Usuario creado exitosamente",
      statusCode: 201,
    });
  }
}
