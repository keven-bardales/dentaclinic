"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BranchOfficeEntity } from "@/features/branch-office/domain/entities/branch-office.entity";

export default function BranchOfficesDataTable({ initialBranchOffices }: { initialBranchOffices: string }) {
  const parsedBranchOffices = JSON.parse(initialBranchOffices ?? "[]") as BranchOfficeEntity[];
  const branchOffices = parsedBranchOffices.map((branchOffice) => {
    return BranchOfficeEntity.create(branchOffice);
  });

  const router = useRouter();
  const [newBranchOffice, setNewBranchOffice] = useState(false);

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="text-2xl">Sucursales</div>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          e.preventDefault();
          setNewBranchOffice(true);
        }}
        label="Nueva Sucursal"
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
      <DataTable dataKey="id" scrollable paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} header={header} value={branchOffices ?? []}>
        <Column field="name" header="Nombre" />
        <Column
          body={(data: BranchOfficeEntity) => {
            return dateFormater.format(data.createdAt.date);
          }}
          header="Creación"
        />
      </DataTable>
    </>
  );
}
