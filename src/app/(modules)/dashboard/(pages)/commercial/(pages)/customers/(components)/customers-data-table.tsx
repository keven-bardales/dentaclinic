"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CustomerEntity } from "@/features/customer/domain/entities/customer.entity";

export default function CustomersDataTable({ initialCustomers }: { initialCustomers: string }) {
  const parsedCustomers = JSON.parse(initialCustomers ?? "[]") as CustomerEntity[];
  const customers = parsedCustomers.map((customer) => {
    return CustomerEntity.create(customer);
  });

  const router = useRouter();
  const [newCustomer, setNewCustomer] = useState(false);

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="text-2xl">Clientes</div>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          e.preventDefault();
          setNewCustomer(true);
        }}
        label="Nuevo Cliente"
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
      <DataTable dataKey="id" scrollable paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} header={header} value={customers ?? []}>
        <Column field="name" header="Nombre" />
        <Column field="lastname" header="Apellido" />
        <Column field="fullName" header="Nombre Completo" />
        <Column field="type" header="Tipo de Cliente" />
        <Column field="dni" header="DNI" />
        <Column field="rtn" header="RTN" />
        <Column
          body={(data: CustomerEntity) => {
            return dateFormater.format(data.createdAt.date);
          }}
          header="Creación"
        />
      </DataTable>
    </>
  );
}
