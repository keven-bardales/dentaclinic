"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CityEntity } from "@/features/city/domain/entities/city.entity";

export default function CitiesDataTable({ initialCities }: { initialCities: string }) {
  const parsedCities = JSON.parse(initialCities ?? "[]") as CityEntity[];
  const cities = parsedCities.map((city) => CityEntity.create(city));

  const router = useRouter();
  const [newCity, setNewCity] = useState(false);

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="text-2xl">Ciudades</div>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          e.preventDefault();
          setNewCity(true);
        }}
        label="Nueva Ciudad"
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
      <DataTable dataKey="id" scrollable paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} header={header} value={cities ?? []}>
        <Column field="name" header="Nombre" />
        <Column field="code" header="Código" />
        <Column field="state.name" header="Estado" />
        <Column field="state.country.name" header="Pais" />
        <Column field="neighborhoods.length" header="# Barrios" />
        <Column
          body={(data: CityEntity) => {
            return dateFormater.format(data.createdAt.date);
          }}
          header="Creación"
        />
      </DataTable>
    </>
  );
}
