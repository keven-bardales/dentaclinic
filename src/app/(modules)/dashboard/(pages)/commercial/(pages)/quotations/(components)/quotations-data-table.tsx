"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { QuotationEntity } from "@/features/quotation/domain/entities/quotation.entity";

export default function QuotationsDataTable({ initialQuotations }: { initialQuotations: string }) {
  const quotationsParsed = JSON.parse(initialQuotations ?? "[]");
  const quotationsWithTableFields: any[] = [];

  const numberFormatter = new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "HNL",
  });

  const quotations = quotationsParsed.map((quotation: any) => {
    const quoatationForTable = {
      id: quotation.id,
      code: quotation.code,
      customerName: quotation.customer.fullName,
      total: numberFormatter.format(quotation.total),
      createdAt: quotation.createdAt,
      branchOfficeName: quotation.branchOffice.name,
    };

    quotationsWithTableFields.push(quoatationForTable);

    return QuotationEntity.create(quotation);
  });

  const router = useRouter();
  const [newQuotation, setnewQuotation] = useState(false);

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="text-2xl">Cotizaciones</div>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          e.preventDefault();
          setnewQuotation(true);
        }}
        label="Nueva cotizacion"
      />
    </div>
  );

  return (
    <>
      <DataTable
        dataKey="id"
        scrollable
        paginator
        onRowClick={(e) => {
          router.push(`/dashboard/commercial/quotations/${e.data.id}`);
        }}
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        header={header}
        value={quotationsWithTableFields ?? []}
      >
        <Column field="code" header="Codigo" />
        <Column field="customerName" header="Cliente" />
        <Column field="total" header="Total" />
        <Column field="branchOfficeName" header="Sucursal" />
      </DataTable>
    </>
  );
}
