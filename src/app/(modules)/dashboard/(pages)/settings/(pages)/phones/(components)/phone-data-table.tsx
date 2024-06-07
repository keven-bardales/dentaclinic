"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PhoneEntity } from "@/features/phone/domain/entities/phone.entity";

export default function PhonesDataTable({ initialPhones }: { initialPhones: string }) {
  const parsedPhones = JSON.parse(initialPhones ?? "[]") as PhoneEntity[];
  const phones = parsedPhones.map((phone) => PhoneEntity.create(phone));

  const router = useRouter();
  const [newPhone, setNewPhone] = useState(false);

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="text-2xl">Teléfonos</div>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          e.preventDefault();
          setNewPhone(true);
        }}
        label="Nuevo Teléfono"
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
      <DataTable dataKey="id" scrollable paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} header={header} value={phones ?? []}>
        <Column field="phone" header="Teléfono" />
        <Column field="status" header="Estado" />
        <Column
          body={(data: PhoneEntity) => {
            return dateFormater.format(data.createdAt.date);
          }}
          header="Creación"
        />
      </DataTable>
    </>
  );
}
