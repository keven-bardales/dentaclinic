"use client";

import { QuotationEntity } from "@/features/quotation/domain/entities/quotation.entity";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default function QuotationDetailDataTable({ quotation }: { quotation: QuotationEntity }) {
  const numberFormatter = new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "HNL",
  });

  const normalNumberFormatter = new Intl.NumberFormat("es-HN");

  return (
    <DataTable
      scrollable
      pt={{
        root: {
          style: { maxHeight: "600px" },
        },
      }}
      value={quotation.quotationDetails}
    >
      <Column field="product.name" header="Producto"></Column>
      <Column field="product.category.name" header="Categoría"></Column>
      <Column
        body={(item) => {
          return normalNumberFormatter.format(item.quantity);
        }}
        header="Cantidad"
      ></Column>
      <Column
        body={(item) => {
          return numberFormatter.format(item.price);
        }}
        header="Precio"
      ></Column>
      <Column
        body={(item) => {
          return numberFormatter.format(item.total);
        }}
        header="Total"
      ></Column>
    </DataTable>
  );
}
