"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StateEntity } from "@/features/state/domain/entities/state-entity";

export default function StatesDataTable({ initialStates }: { initialStates: string }) {
  const parsedStates = JSON.parse(initialStates ?? "[]") as StateEntity[];
  const states = parsedStates.map((state) => {
    return StateEntity.create(state);
  });

  const router = useRouter();
  const [newState, setNewState] = useState(false);

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="text-2xl">Estados</div>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          e.preventDefault();
          setNewState(true);
        }}
        label="Nuevo Estado"
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

  console.log(states);

  return (
    <>
      <DataTable dataKey="id" scrollable paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} header={header} value={states ?? []}>
        <Column field="name" header="Nombre" />
        <Column field="code" header="Código" />
        <Column field="country.name" header="Pais" />
        <Column field="cities.length" header="# Ciudades" />
        <Column
          body={(data: StateEntity) => {
            return dateFormater.format(data.createdAt.date);
          }}
          header="Creación"
        />
      </DataTable>
    </>
  );
}
