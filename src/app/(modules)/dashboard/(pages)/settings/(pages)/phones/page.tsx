import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";
import { getCachedPhones } from "./cache-keys/get-cached-phones";
import PhonesDataTable from "./(components)/phone-data-table";

export default async function PhonesPage() {
  const phonesData = await getCachedPhones();

  return (
    <BasicPageWrapper>
      <PhonesDataTable initialPhones={JSON.stringify(phonesData.data)}></PhonesDataTable>
    </BasicPageWrapper>
  );
}
