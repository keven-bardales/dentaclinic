"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NeighborhoodEntity } from "@/features/neighborhood/domain/entities/neighborhood.entity";

export default function NeighborhoodsDataTable({ initialNeighborhoods }: { initialNeighborhoods: string }) {
  const parsedNeighborhoods = JSON.parse(initialNeighborhoods ?? "[]") as NeighborhoodEntity[];
  const neighborhoods = parsedNeighborhoods.map((neighborhood) => NeighborhoodEntity.create(neighborhood));

  const router = useRouter();
  const [newNeighborhood, setNewNeighborhood] = useState(false);

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="text-2xl">Barrios</div>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          e.preventDefault();
          setNewNeighborhood(true);
        }}
        label="Nuevo Barrio"
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
      <DataTable dataKey="id" scrollable paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} header={header} value={neighborhoods ?? []}>
        <Column field="name" header="Nombre" />
        <Column field="code" header="Código" />
        <Column field="city.name" header="Ciudad" />
        <Column field="city.state.name" header="Estado" />
        <Column field="city.state.country.name" header="Pais" />
        <Column
          body={(data: NeighborhoodEntity) => {
            return dateFormater.format(data.createdAt.date);
          }}
          header="Creación"
        />
      </DataTable>
    </>
  );
}
