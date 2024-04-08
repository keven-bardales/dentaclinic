import { bcryptAdapter } from "@/features/common/adapters/bcryptjs.adapter";
import { UserRepositoryImpl } from "../../infrastructure/repository-implementation/user-repository-impl";
import { LoggedInUserDto } from "../dtos/logged-in-user-dto";
import { baseValidator } from "@/features/common/validators/base.validator";
import { registerUserSchema } from "../schemas/register-user.schema";
import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { RegisterUserPayload } from "../interfaces/register-user.interface";

export class RegisterUseCase {
  repository = new UserRepositoryImpl();

  async execute(payload: RegisterUserPayload): Promise<ApiResponse<LoggedInUserDto | null>> {
    const validationResult = baseValidator(registerUserSchema, payload);

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

    const hashedPassword = await bcryptAdapter.hash(payload.password);

    const payloadWithHashedPassword = {
      ...payload,
      password: hashedPassword,
    };

    const result = await this.repository.registerUser(payloadWithHashedPassword);

    if (!result) {
      return ApiResponse.internalServerError({
        errors: ["Error al crear usuario"],
        message: null,
      });
    }

    return ApiResponse.success({
      data: LoggedInUserDto.create(result),
      message: "Usuario creado exitosamente",
      statusCode: 201,
    });
  }
}
