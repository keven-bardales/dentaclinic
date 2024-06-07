import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";
import { getCachedNeighborhoods } from "./cache/get-cached-neighborhoods";
import NeighborhoodsDataTable from "./(components)/neighborhoods-data-table";
import revalidatePath from "@/lib/utils/revalidatePath";

export default async function NeighborhoodsPage() {
  const neighborhoodsData = await getCachedNeighborhoods();

  return (
    <BasicPageWrapper>
      <NeighborhoodsDataTable initialNeighborhoods={JSON.stringify(neighborhoodsData.data)}></NeighborhoodsDataTable>
    </BasicPageWrapper>
  );
}
