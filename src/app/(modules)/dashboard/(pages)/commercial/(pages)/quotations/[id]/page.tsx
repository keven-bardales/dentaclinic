import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";
import { GetQuotationByIdUseCase } from "@/features/quotation/domain/use-cases/get-by-Id-quotation.use-case";
import { notFound } from "next/navigation";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import QuotationDetailDataTable from "../(components)/quotation-detail-data-table";
import QuotationsDetailComponent from "../(components)/quotation-detail";

export default async function QuotationsDetailPage({ params }: { params: any }) {
  const quotationId = params?.id;

  const quotation = await new GetQuotationByIdUseCase().execute(quotationId);

  if (!quotation.data) {
    notFound();
  }

  return (
    <BasicPageWrapper>
      <QuotationsDetailComponent quotationString={JSON.stringify(quotation.data)}></QuotationsDetailComponent>
    </BasicPageWrapper>
  );
}
