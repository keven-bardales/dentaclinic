import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";
import StatesDataTable from "./(components)/states-data-table";
import { getCachedStates } from "./cache/get-cached-states";

export default async function StatesPage() {
  const statesData = await getCachedStates();

  return (
    <BasicPageWrapper>
      <StatesDataTable initialStates={JSON.stringify(statesData.data)}></StatesDataTable>
    </BasicPageWrapper>
  );
}
