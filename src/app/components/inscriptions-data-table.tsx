"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Inscription } from "@prisma/client";
import * as XLSX from "xlsx";
import { InputText } from "primereact/inputtext";
import { useRouter, useSearchParams } from "next/navigation";

export default function InscriptionsDataTable({ inscriptions }: { inscriptions: Inscription[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="font-bold text-4xl">Lista de Inscripciones</span>

      <InputText
        className="ml-auto min-w-[300px]"
        onChange={(e) => {
          router.push(`/inscriptions?search=${e.target.value}`);
        }}
      />

      <Button
        className="bg-green-700"
        icon="pi pi-file-excel"
        onClick={(e) => {
          const columNames = inscriptions.map((inscription) => {
            return {
              Nombre: inscription.name,
              Correo: inscription.email,
              Telefono: inscription.phone,
              Empresa: inscription.company,
              Ciudad: inscription.city,
              Observaciones: inscription.description,
            };
          });

          const ws = XLSX.utils.json_to_sheet(columNames);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Inscripciones");
          XLSX.writeFile(wb, "inscripciones.xlsx");
        }}
        label="Exportar a excel"
      />
    </div>
  );

  const filteredInscriptions = inscriptions.filter((inscription) => {});

  return (
    <>
      <DataTable<Inscription[]>
        dataKey="id"
        scrollable
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        header={header}
        value={inscriptions ?? []}
      >
        <Column field="name" header="Nombre" />
        <Column field="email" header="Correo" />
        <Column field="phone" header="Teléfono" />
        <Column field="company" header="Empresa" />
        <Column field="city" header="Ciudad" />
        <Column field="description" header="Observación" />
      </DataTable>
    </>
  );
}
