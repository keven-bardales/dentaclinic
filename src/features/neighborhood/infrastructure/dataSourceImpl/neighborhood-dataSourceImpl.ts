import { BaseDataSourceImpl } from "@/features/common/infrastructure/datasource-implementation/base-datasource-implementation";
import { db } from "@/lib/db/db";
import { NeighborhoodEntity } from "../../domain/entities/neighborhood.entity";

export class NeighborhoodSourceImpl extends BaseDataSourceImpl<NeighborhoodEntity> {
  constructor() {
    super(NeighborhoodEntity);
  }

  async getAllNeighborhoods(): Promise<NeighborhoodEntity[] | null> {
    const neighborhoods = await db.neighborhood.findMany({
      include: {
        city: {
          include: {
            state: {
              include: {
                country: true,
              },
            },
          },
        },
      },
    });

    return neighborhoods.map((neighborhood) => NeighborhoodEntity.create(neighborhood));
  }
}
