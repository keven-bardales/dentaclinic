import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";
import { getCachedPriceLists } from "./cache/get-cached-price-list";
import PriceListsDataTable from "./(components)/price-list-data-table";

export default async function PriceListsPage() {
  const priceListsData = await getCachedPriceLists();

  return (
    <BasicPageWrapper>
      <PriceListsDataTable initialPriceLists={JSON.stringify(priceListsData.data)}></PriceListsDataTable>
    </BasicPageWrapper>
  );
}
