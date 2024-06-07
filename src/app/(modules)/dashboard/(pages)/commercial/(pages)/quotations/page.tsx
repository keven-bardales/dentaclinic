import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";
import { getCachedQuotations } from "./cached/get-cached-quotations";
import { GetQuotationListUseCase } from "@/features/quotation/domain/use-cases/get-all-quotations.use-case";
import QuotationsDataTable from "./(components)/quotations-data-table";

export default async function QuotationsPage() {
  // const quotationsPromise = getCachedQuotations();

  // const [quotations] = await Promise.all([quotationsPromise]);

  const quotations = await new GetQuotationListUseCase().execute();

  return (
    <BasicPageWrapper>
      <QuotationsDataTable initialQuotations={JSON.stringify(quotations.data)}></QuotationsDataTable>
    </BasicPageWrapper>
  );
}
