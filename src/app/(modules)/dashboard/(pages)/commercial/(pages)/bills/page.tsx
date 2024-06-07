import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";
import BillsDataTable from "./(components)/bills-data-table";
import { getCachedBills } from "./cache/get-cached-bills";

export default async function BillsPage() {
  const billsData = await getCachedBills();

  return (
    <BasicPageWrapper>
      <BillsDataTable initialBills={JSON.stringify(billsData.data)}></BillsDataTable>
    </BasicPageWrapper>
  );
}
