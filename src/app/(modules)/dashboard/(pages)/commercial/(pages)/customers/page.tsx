import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";
import CustomersDataTable from "./(components)/customers-data-table";
import revalidatePath from "@/lib/utils/revalidatePath";
import { getCachedCustomers } from "./cache/get-cached-customers";

export default async function CustomersPage() {
  const customersData = await getCachedCustomers();

  return (
    <BasicPageWrapper>
      <CustomersDataTable initialCustomers={JSON.stringify(customersData.data)}></CustomersDataTable>
    </BasicPageWrapper>
  );
}
