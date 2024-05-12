import { BaseRepositoryImpl } from "@/features/common/infrastructure/repository-implementation/base-repository-implementation";
import { SessionEntity } from "../../domain/entities/session.entity";
import { SessionDataSourceImpl } from "../datasource-implementations/session-datasource-implementation";

export class SessionRepositoryImpl extends BaseRepositoryImpl<SessionEntity> {
  source: SessionDataSourceImpl;
  constructor() {
    super(new SessionDataSourceImpl());
    this.source = new SessionDataSourceImpl();
  }

  createNewSession(session: SessionEntity): Promise<SessionEntity | null> {
    return this.source.createNewSession(session);
  }

  getSessionByToken(token: string): Promise<SessionEntity | null> {
    return this.source.getSessionByToken(token);
  }

  updateSession(session: SessionEntity): Promise<SessionEntity | null> {
    return this.source.updateSession(session);
  }

  getByUserId(userId: string): Promise<SessionEntity | null> {
    return this.source.getByUserId(userId);
  }
}
