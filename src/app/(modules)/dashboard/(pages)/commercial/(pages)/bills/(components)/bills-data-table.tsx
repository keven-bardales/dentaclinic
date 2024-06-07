"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BillEntity } from "@/features/bill/domain/entities/bill-entity";

export default function BillsDataTable({ initialBills }: { initialBills: string }) {
  const parsedBills = JSON.parse(initialBills ?? "[]") as BillEntity[];
  const bills = parsedBills.map((bill) => {
    return BillEntity.create(bill);
  });

  const router = useRouter();
  const [newBill, setNewBill] = useState(false);

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="text-2xl">Facturas</div>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          e.preventDefault();
          setNewBill(true);
        }}
        label="Nueva Factura"
      />
    </div>
  );

  const dateFormater = new Intl.DateTimeFormat("es-HN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <>
      <DataTable dataKey="id" scrollable paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} header={header} value={bills ?? []}>
        <Column field="code" header="Código" />
        <Column field="project" header="Proyecto" />
        <Column field="documentType" header="Tipo de Documento" />
        <Column
          body={(data: BillEntity) => {
            return dateFormater.format(new Date(data.createdAt.date));
          }}
          header="Creación"
        />
      </DataTable>
    </>
  );
}
