"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WarehouseEntity } from "@/features/warehouse/domain/entities/warehouse.entity";

export default function WarehousesDataTable({ initialWarehouses }: { initialWarehouses: string }) {
  const parsedWarehouses = JSON.parse(initialWarehouses ?? "[]") as WarehouseEntity[];
  const warehouses = parsedWarehouses.map((warehouse) => {
    return WarehouseEntity.create(warehouse);
  });

  const router = useRouter();
  const [newWarehouse, setNewWarehouse] = useState(false);

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="text-2xl">Almacenes</div>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          e.preventDefault();
          setNewWarehouse(true);
        }}
        label="Nuevo Almacén"
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
      <DataTable
        emptyMessage={"No hay almacenes"}
        dataKey="id"
        scrollable
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        header={header}
        value={warehouses ?? []}
      >
        <Column field="name" header="Nombre" />
        <Column field="description" header="Descripción" />
        <Column
          body={(data: WarehouseEntity) => {
            return dateFormater.format(new Date(data.createdAt.date));
          }}
          header="Creación"
        />
        <Column field="warehouseStatus" header="Estado" />
        <Column field="branchOffice.name" header="Sucursal" />
      </DataTable>
    </>
  );
}
