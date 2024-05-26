import { GetWarehouseListUseCase } from "@/features/warehouse/domain/use-cases/get-all-warehouses-use-case";
import { cache } from "@/lib/utils/cache";
import { WAREHOUSESCACHEKEYS } from "../cache-keys/warehouses-cache-keys";

export const getCachedWarehouses = cache(
  async () => {
    const useCase = new GetWarehouseListUseCase();

    const warehouses = await useCase.execute();

    return warehouses;
  },
  [WAREHOUSESCACHEKEYS.WAREHOUSES.key],
  {
    revalidate: WAREHOUSESCACHEKEYS.WAREHOUSES.revalidate,
    tags: WAREHOUSESCACHEKEYS.WAREHOUSES.tags,
  }
);
