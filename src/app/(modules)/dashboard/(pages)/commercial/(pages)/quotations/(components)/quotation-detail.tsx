"use client";
import { QuotationEntity } from "@/features/quotation/domain/entities/quotation.entity";
import QuotationDetailDataTable from "./quotation-detail-data-table";
import QuotationDetailPdf from "./pdf/quotation-detail-pdf";
import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(() => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function QuotationsDetailComponent({ quotationString }: { quotationString: string }) {
  const parsedQuotation = JSON.parse(quotationString) as QuotationEntity;

  return (
    <div className="flex flex-col gap-y-3">
      <div className="w-full flex justify-between flex-wrap">
        <h1 className="text-3xl font-bold">
          Cotización {parsedQuotation.code} - {parsedQuotation?.customer?.fullName}
        </h1>
        <div>
          <PDFDownloadLink
            document={<QuotationDetailPdf quotation={parsedQuotation} />}
            fileName={`Cotización ${parsedQuotation.code} - ${parsedQuotation?.customer?.fullName}`}
          >
            {({ blob, url, loading, error }) => (loading ? "Cargando documento..." : "Descargar PDF")}
          </PDFDownloadLink>
        </div>
      </div>

      <QuotationDetailDataTable quotation={parsedQuotation} />
    </div>
  );
}
