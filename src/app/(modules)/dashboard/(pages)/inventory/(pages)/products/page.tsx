import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";
import { getCachedProducts } from "./cached/get-cached-products";
import ProductsDataTable from "./(components)/products-data-table";
import { GetProductsListUseCase } from "@/features/product/domain/use-cases/get-all-products-use-case";
import revalidatePath from "@/lib/utils/revalidatePath";
import { revalidateTag } from "next/cache";

export default async function ProductsPage() {
  const productsData = await getCachedProducts();

  return (
    <BasicPageWrapper>
      <ProductsDataTable initialProducts={JSON.stringify(productsData.data)}></ProductsDataTable>
    </BasicPageWrapper>
  );
}
