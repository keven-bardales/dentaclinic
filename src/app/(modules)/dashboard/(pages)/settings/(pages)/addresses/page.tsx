import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";
import { getCachedAddresses } from "./cache/get-cached-addresses";
import AddressesDataTable from "./(components)/addresses-data-table";

export default async function AddressesPage() {
  const addressesData = await getCachedAddresses();

  return (
    <BasicPageWrapper>
      <AddressesDataTable initialAddresses={JSON.stringify(addressesData.data)}></AddressesDataTable>
    </BasicPageWrapper>
  );
}
