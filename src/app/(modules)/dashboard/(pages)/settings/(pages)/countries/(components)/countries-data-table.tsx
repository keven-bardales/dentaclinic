"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CountryEntity } from "@/features/country/domain/entities/city.entity";

export default function CountriesDataTable({ initialCountries }: { initialCountries: string }) {
  const parsedCountries = JSON.parse(initialCountries ?? "[]") as CountryEntity[];
  const countries = parsedCountries.map((country) => {
    return CountryEntity.create(country);
  });

  const router = useRouter();
  const [newCountry, setNewCountry] = useState(false);

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="text-2xl">Países</div>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          e.preventDefault();
          setNewCountry(true);
        }}
        label="Nuevo País"
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
      <DataTable dataKey="id" scrollable paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} header={header} value={countries ?? []}>
        <Column field="name" header="Nombre" />
        <Column field="code" header="Código" />
        <Column
          body={(data: CountryEntity) => {
            return dateFormater.format(data.createdAt.date);
          }}
          header="Creación"
        />
      </DataTable>
    </>
  );
}
