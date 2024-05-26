import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";
import WarehousesDataTable from "./(components)/warehouses-data-table";
import { getCachedWarehouses } from "./cache/get-cached-warehouses";

export default async function WarehousesPage() {
  const warehousesData = await getCachedWarehouses();

  return (
    <BasicPageWrapper>
      <WarehousesDataTable initialWarehouses={JSON.stringify(warehousesData.data)}></WarehousesDataTable>
    </BasicPageWrapper>
  );
}
