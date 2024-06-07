import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";
import CitiesDataTable from "./(components)/cities-data-table";
import { getCachedCities } from "./cache/get-cached-cities";

export default async function CitiesPage() {
  const citiesData = await getCachedCities();

  return (
    <BasicPageWrapper>
      <CitiesDataTable initialCities={JSON.stringify(citiesData.data)}></CitiesDataTable>
    </BasicPageWrapper>
  );
}
