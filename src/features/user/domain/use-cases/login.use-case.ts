import { bcryptAdapter } from "@/features/common/adapters/bcryptjs.adapter";
import { UserRepositoryImpl } from "../../infrastructure/repository-implementation/user-repository-impl";
import { LoggedInUserDto } from "../dtos/logged-in-user-dto";
import { SessionRepositoryImpl } from "@/features/session/infrastructure/repository-implementarion/session-repository.implementation";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { SessionEntity } from "@/features/session/domain/entities/session.entity";

export class LoginUseCase {
  repository = new UserRepositoryImpl();
  sessionRepository = new SessionRepositoryImpl();

  async execute(
    email: string,
    password: string,
    rememberme: boolean,
    rememberMeToken: string
  ): Promise<{
    user: LoggedInUserDto;
    sessionToken: string;
  } | null> {
    if (rememberMeToken) {
      const session = await this.sessionRepository.getSessionByToken(rememberMeToken);

      if (!session) {
        return null;
      }

      const user = await this.repository.getUserById(session.userId);

      if (!user) {
        return null;
      }

      const dto = LoggedInUserDto.create(user);

      const sessionToken = await bcryptAdapter.generateRandomToken();

      const newSession = await this.sessionRepository.createNewSession(
        new SessionEntity("", sessionToken, rememberme, dto.id, new DateWrapper(new Date()), new DateWrapper(new Date()), new DateWrapper(new Date()))
      );

      if (!newSession) {
        return null;
      }

      return {
        user: dto,
        sessionToken,
      };
    }

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

    const dto = LoggedInUserDto.create(user);

    const sessionToken = await bcryptAdapter.generateRandomToken();

    const session = await this.sessionRepository.createNewSession(
      new SessionEntity("", sessionToken, rememberme, dto.id, new DateWrapper(new Date()), new DateWrapper(new Date()), new DateWrapper(new Date()))
    );

    if (!session) {
      return null;
    }

    return {
      user: dto,
      sessionToken,
    };
  }
}
