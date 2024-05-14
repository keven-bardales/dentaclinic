"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Inscription } from "@prisma/client";
import * as XLSX from "xlsx";
import { InputText } from "primereact/inputtext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { Tooltip } from "primereact/tooltip";

export default function InscriptionsDataTable({ inscriptions }: { inscriptions: Inscription[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInscription, setSelectedInscription] = useState<Inscription | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [router]);

  const filteredInscriptions = inscriptions.filter((inscription) => {
    if (search === "") return true;

    return (
      inscription.name.toLowerCase().includes(search.toLowerCase()) ||
      inscription.email.toLowerCase().includes(search.toLowerCase()) ||
      inscription.phone.toLowerCase().includes(search.toLowerCase()) ||
      inscription.company.toLowerCase().includes(search.toLowerCase()) ||
      inscription.city.toLowerCase().includes(search.toLowerCase()) ||
      inscription?.description?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const commentTemplate = (data: Inscription) => {
    return <span className="line-clamp-2 max-w-[200px]">{data.description}</span>;
  };

  const actionsTemplate = (data: Inscription) => {
    return (
      <>
        <Tooltip content="Ver comentarios" target=".tooltip-button" position="top" />
        <div className="flex items-center justify-center tooltip-button">
          <Button
            className="bg-primary"
            icon="pi pi-envelope"
            onClick={() => {
              setSelectedInscription(data);
              setIsModalOpen(true);
            }}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="h-full">
        <>
          <div className="flex flex-wrap items-center justify-between gap-4 max-w-">
            <span className="font-bold text-4xl">Lista de Inscripciones</span>

            <InputText
              className="ml-auto min-w-[300px] grow sm:grow-0"
              onChange={(e) => {
                router.replace(`/dashboard/inscriptions?search=${e.target.value}`, {
                  scroll: false,
                });
              }}
            />

            <Button
              className="bg-green-700 grow sm:grow-0 ml-auto lg:ml-0"
              icon="pi pi-file-excel"
              onClick={(e) => {
                const columNames = inscriptions.map((inscription) => {
                  return {
                    Nombre: inscription.name,
                    Correo: inscription.email,
                    Telefono: inscription.phone,
                    Empresa: inscription.company,
                    Ciudad: inscription.city,
                    Comentarios: inscription.description,
                    "Producto de Interes": inscription.product,
                    "Marca de Interes": inscription.brand,
                  };
                });

                const ws = XLSX.utils.json_to_sheet(columNames);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Inscripciones");
                XLSX.writeFile(wb, "inscripciones.xlsx");
              }}
              label="Exportar a excel"
            />
          </div>
        </>

        <div className="h-full overflow-auto">
          <DataTable<Inscription[]>
            dataKey="id"
            scrollable
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
            value={filteredInscriptions ?? []}
            emptyMessage="No hay inscripciones"
            pt={{
              emptyMessage: {
                className: "flex justify-center items-center h-96",
              },
            }}
          >
            <Column field="name" header="Nombre" />
            <Column field="email" header="Correo" />
            <Column field="phone" header="Teléfono" />
            <Column field="company" header="Empresa" />
            <Column field="city" header="Ciudad" />
            <Column field="description" body={commentTemplate} header="Comentarios" />
            <Column field="product" header="Producto de Interes" />
            <Column field="brand" header="Marca de Interes" />
            <Column body={actionsTemplate} header="Acciones" />
          </DataTable>
        </div>
      </div>
    </>
  );
}
