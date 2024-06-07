"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CompanyEntity } from "@/features/company/domain/entities/company.entitity";

export default function CompaniesDataTable({ initialCompanies }: { initialCompanies: string }) {
  const parsedCompanies = JSON.parse(initialCompanies ?? "[]") as CompanyEntity[];
  const companies = parsedCompanies.map((company) => {
    return CompanyEntity.create(company);
  });

  const router = useRouter();
  const [newCompany, setNewCompany] = useState(false);

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="text-2xl">Compañías</div>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          e.preventDefault();
          setNewCompany(true);
        }}
        label="Nueva Compañía"
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
      <DataTable dataKey="id" scrollable paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} header={header} value={companies ?? []}>
        <Column field="name" header="Nombre" />
        <Column field="acronym" header="Acrónimo" />
        <Column field="rtn" header="RTN" />
        <Column
          body={(data: CompanyEntity) => {
            return dateFormater.format(data.createdAt.date);
          }}
          header="Creación"
        />
      </DataTable>
    </>
  );
}
