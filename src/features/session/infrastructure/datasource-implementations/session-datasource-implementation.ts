import { db } from "@/lib/db/db";
import { SessionEntity } from "../../domain/entities/session.entity";
import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";

export class SessionDataSourceImpl extends BaseDataSourceImpl<SessionEntity> {
  constructor() {
    super(SessionEntity);
  }

  async createNewSession(session: SessionEntity): Promise<SessionEntity | null> {
    const newSession = await db.session.create({
      data: {
        expires: session.expires.toDataBase,
        sessionToken: session.sessionToken,
        userId: session.userId,
        rememberUser: session.rememberUser,
      },
    });

    if (!newSession) {
      return null;
    }

    return SessionEntity.create(newSession);
  }

  async getSessionByToken(token: string): Promise<SessionEntity | null> {
    const session = await db.session.findUnique({
      where: {
        sessionToken: token,
      },
    });

    if (!session) {
      return null;
    }

    return SessionEntity.create(session);
  }

  async updateSession(session: SessionEntity): Promise<SessionEntity | null> {
    const updatedSession = await db.session.update({
      data: session.toDb,
      where: {
        id: session.id,
      },
    });

    if (!updatedSession) {
      return null;
    }

    return SessionEntity.create(updatedSession);
  }

  async getByUserId(userId: string): Promise<SessionEntity | null> {
    const session = await db.session.findFirst({
      where: {
        userId,
      },
    });

    if (!session) {
      return null;
    }

    return SessionEntity.create(session);
  }
}
