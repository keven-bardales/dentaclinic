"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AddressEntity } from "@/features/address/domain/entities/address.entity";

export default function AddressesDataTable({ initialAddresses }: { initialAddresses: string }) {
  const parsedAddresses = JSON.parse(initialAddresses ?? "[]") as AddressEntity[];
  const addresses = parsedAddresses.map((address) => AddressEntity.create(address));

  const router = useRouter();
  const [newAddress, setNewAddress] = useState(false);

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="text-2xl">Direcciones</div>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          e.preventDefault();
          setNewAddress(true);
        }}
        label="Nueva Dirección"
      />
    </div>
  );

  console.log("addresses", addresses);

  const dateFormater = new Intl.DateTimeFormat("es-HN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <>
      <DataTable dataKey="id" scrollable paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} header={header} value={addresses ?? []}>
        <Column field="fullAddress" header="Dirección Completa" />
        <Column field="street" header="Calle" />
        <Column field="number" header="Número" />
        <Column field="neighborhoodName" header="Nombre del Barrio" />
        <Column field="city.name" header="Nombre de la Ciudad" />
        <Column field="state.name" header="Nombre del Estado" />
        <Column field="country.name" header="Nombre del País" />
        <Column
          body={(data: AddressEntity) => {
            return dateFormater.format(data.createdAt.date);
          }}
          header="Creación"
        />
      </DataTable>
    </>
  );
}
