import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";
import { getCachedBranchOffices } from "./cache/get-cached-branch-offices";
import BranchOfficesDataTable from "./(components)/branch-office-data-table";

export default async function BranchOfficesPage() {
  const branchOfficesData = await getCachedBranchOffices();

  return (
    <BasicPageWrapper>
      <BranchOfficesDataTable initialBranchOffices={JSON.stringify(branchOfficesData.data)}></BranchOfficesDataTable>
    </BasicPageWrapper>
  );
}
