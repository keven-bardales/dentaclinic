import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";
import CountriesDataTable from "./(components)/countries-data-table";
import { getCachedCountries } from "./cache/get-cached-countries";

export default async function CountriesPage() {
  const countriesData = await getCachedCountries();

  return (
    <BasicPageWrapper>
      <CountriesDataTable initialCountries={JSON.stringify(countriesData.data)}></CountriesDataTable>
    </BasicPageWrapper>
  );
}
