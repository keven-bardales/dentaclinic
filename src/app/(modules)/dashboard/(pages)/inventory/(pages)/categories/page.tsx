import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";
import { getCachedCategories } from "./cached/get-cached-categories";
import CategoriesDataTable from "./(components)/categories-data-table";
import { ProductCategorySourceImpl } from "@/features/category/infrastructure/datasourceImpl/product-categories-datasourceImpl";
import { GetCategoriesListUseCase } from "@/features/category/domain/use-cases/get-all-categories.use-case";

export default async function CategoriesPage() {
  // const categories = await getCachedCategories();

  const noCachedCategories = await new GetCategoriesListUseCase().execute();

  return (
    <BasicPageWrapper>
      <CategoriesDataTable initialCategories={JSON.stringify(noCachedCategories.data)}></CategoriesDataTable>
    </BasicPageWrapper>
  );
}
