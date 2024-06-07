"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PriceListEntity } from "@/features/pricelist/domain/entities/pricelist.entity";

export default function PriceListsDataTable({ initialPriceLists }: { initialPriceLists: string }) {
  const parsedPriceLists = JSON.parse(initialPriceLists ?? "[]") as PriceListEntity[];
  const priceLists = parsedPriceLists.map((priceList) => {
    return PriceListEntity.create(priceList);
  });

  const router = useRouter();
  const [newPriceList, setNewPriceList] = useState(false);

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="text-2xl">Listas de Precios</div>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          e.preventDefault();
          setNewPriceList(true);
        }}
        label="Nueva Lista de Precios"
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
      <DataTable dataKey="id" scrollable paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} header={header} value={priceLists ?? []}>
        <Column field="name" header="Nombre" />
        <Column field="description" header="Descripción" />
        <Column field="status" header="Estado" />
        <Column
          body={(data: PriceListEntity) => {
            return dateFormater.format(data.createdAt.date);
          }}
          header="Creación"
        />
        <Column field="priceList.length" header="Productos" />
      </DataTable>
    </>
  );
}
