import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";
import { getCachedCategories } from "./cached/get-cached-categories";
import CategoriesDataTable from "./(components)/categories-data-table";
import { GetCategoriesListUseCase } from "@/features/category/domain/use-cases/get-all-categories.use-case";

export default async function CategoriesPage() {
  const categories = await getCachedCategories();

  // const categories = await new GetCategoriesListUseCase().execute();

  return (
    <BasicPageWrapper>
      <CategoriesDataTable initialCategories={JSON.stringify(categories.data)}></CategoriesDataTable>
    </BasicPageWrapper>
  );
}
