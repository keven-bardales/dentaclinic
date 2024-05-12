import { bcryptAdapter } from "@/features/common/adapters/bcryptjs.adapter";
import { UserRepositoryImpl } from "../../infrastructure/repository-implementation/user-repository-impl";
import { LoggedInUserDto } from "../dtos/logged-in-user-dto";
import { SessionRepositoryImpl } from "@/features/session/infrastructure/repository-implementarion/session-repository.implementation";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";
import { SessionEntity } from "@/features/session/domain/entities/session.entity";

export class LoginUseCase {
  repository = new UserRepositoryImpl();
  sessionRepository = new SessionRepositoryImpl();

  async execute(email: string, password: string, rememberme: boolean, rememberMeToken: string): Promise<LoggedInUserDto | null> {
    const today = new DateWrapper(new Date());

    if (rememberMeToken) {
      const session = await this.sessionRepository.getSessionByToken(rememberMeToken);

      if (!session) {
        return null;
      }

      if (!session.expires.isBefore(today)) {
        return null;
      }

      const differenceInDays = session.expires.differenceInDays(today);

      const user = await this.repository.getUserById(session.userId);

      if (!user) {
        return null;
      }

      if (session.userId !== user.id) {
        return null;
      }

      const sessionToken = await bcryptAdapter.generateRandomToken();

      session.sessionToken = sessionToken;

      if (differenceInDays < 1) {
        session.expires = new DateWrapper(new Date(today.date.setDate(today.date.getDate() + 30)));
      }

      const updatedSession = await this.sessionRepository.updateSession(session);

      if (!updatedSession) {
        return null;
      }

      return LoggedInUserDto.create(user, updatedSession);
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

    const sessionToken = await bcryptAdapter.generateRandomToken();

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 8);

    if (rememberme === true) {
      expiration.setDate(expiration.getDate() + 30);
    }

    const existingSession = await this.sessionRepository.getByUserId(user.id);

    if (existingSession) {
      const updatedSession = await this.sessionRepository.updateSession(
        new SessionEntity(
          existingSession.id,
          sessionToken,
          rememberme,
          user.id,
          new DateWrapper(expiration),
          new DateWrapper(new Date()),
          new DateWrapper(new Date())
        )
      );

      if (!updatedSession) {
        return null;
      }

      const dto = LoggedInUserDto.create(user, updatedSession);

      return dto;
    }

    const session = await this.sessionRepository.createNewSession(
      new SessionEntity("", sessionToken, rememberme, user.id, new DateWrapper(expiration), new DateWrapper(new Date()), new DateWrapper(new Date()))
    );

    if (!session) {
      return null;
    }

    const dto = LoggedInUserDto.create(user, session);

    return dto;
  }
}
