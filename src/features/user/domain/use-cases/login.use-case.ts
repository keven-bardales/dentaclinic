import { bcryptAdapter } from "@/features/common/adapters/bcryptjs.adapter";
import { UserRepositoryImpl } from "../../infrastructure/repository-implementation/user-repository-impl";
import { LoggedInUserDto } from "../dtos/logged-in-user-dto";

export class LoginUseCase {
  repository = new UserRepositoryImpl();

  async execute(email: string, password: string): Promise<LoggedInUserDto | null> {
    const user = await this.repository.getUserByEmail(email);

    if (!user) {
      return null;
    }

    if (!user.password) {
      return null;
    }

    const isValidPassword = await bcryptAdapter.compare(password, user.password);

    if (!isValidPassword) {
      return null;
    }

    return LoggedInUserDto.create(user);
  }
}
