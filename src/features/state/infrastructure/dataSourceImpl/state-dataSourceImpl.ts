import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { db } from "@/lib/db/db";
import { StateEntity } from "../../domain/entities/state-entity";

export class StateSourceImpl extends BaseDataSourceImpl<StateEntity> {
  constructor() {
    super(StateEntity);
  }

  async getAllStates(): Promise<StateEntity[] | null> {
    const states = await db.state.findMany({
      include: {
        country: true,
        cities: true,
      },
    });

    return states.map((state) => {
      return StateEntity.create(state);
    });
  }
}
