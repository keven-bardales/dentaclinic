import { bcryptAdapter } from "@/features/common/adapters/bcryptjs.adapter";
import { UserRepositoryImpl } from "../../infrastructure/repository-implementation/user-repository-impl";
import { LoggedInUserDto } from "../dtos/logged-in-user-dto";
import { SessionRepositoryImpl } from "@/features/session/infrastructure/repository-implementarion/session-repository.implementation";
import { DateWrapper } from "@/features/common/wrappers/date-wrraper";

export class GetBySessionTokenUseCase {
  repository = new UserRepositoryImpl();
  sessionRepository = new SessionRepositoryImpl();

  async execute(token: string): Promise<LoggedInUserDto | null> {
    const today = new DateWrapper(new Date());

    const session = await this.sessionRepository.getSessionByToken(token);

    if (!session) {
      return null;
    }

    if (session.expires.isBefore(today) && !session.rememberUser) {
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

    if (differenceInDays < 1 && session.rememberUser) {
      session.expires = new DateWrapper(new Date(today.date.setDate(today.date.getDate() + 30)));
    }

    const updatedSession = await this.sessionRepository.updateSession(session);

    if (!updatedSession) {
      return null;
    }

    return LoggedInUserDto.create(user, updatedSession);
  }
}
