import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";
import { getCachedCategories } from "./cached/get-cached-categories";
import CategoriesDataTable from "./(components)/categories-data-table";

export default async function CategoriesPage() {
  const categories = await getCachedCategories();

  return (
    <BasicPageWrapper>
      <CategoriesDataTable initialCategories={JSON.stringify(categories.data)}></CategoriesDataTable>
    </BasicPageWrapper>
  );
}
