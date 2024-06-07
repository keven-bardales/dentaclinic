import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";
import { getCachedCompanies } from "../../cache/get-cached-companies";
import CompaniesDataTable from "../../(components)/compaies-data-table";

export default async function CompaniesPage() {
  const companiesData = await getCachedCompanies();

  return (
    <BasicPageWrapper>
      <CompaniesDataTable initialCompanies={JSON.stringify(companiesData.data)}></CompaniesDataTable>
    </BasicPageWrapper>
  );
}
