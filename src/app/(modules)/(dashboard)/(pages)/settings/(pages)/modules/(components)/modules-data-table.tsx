"use client";
import { Prisma } from "@prisma/client";
import { DataTable } from "primereact/datatable";
import { getModules } from "../(queries)/getModules";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useState } from "react";
import NewModuleModal from "./new-module-modal";
import { CreateModuleDialog } from "./create-module-permission";

export default function ModulesDataTable({ modules }: { modules: Prisma.PromiseReturnType<typeof getModules> }) {
  const [createModuleDialog, setCreateModuleDialog] = useState(false);
  const [createPermissionDialog, setCreatePermissionDialog] = useState(false);
  const [expandedRows, setExpandedRows] = useState<
    Prisma.PromiseReturnType<typeof getModules>[0][] | Prisma.PromiseReturnType<typeof getModules>[0][]
  >();

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="font-bold text-xl">Modulos</span>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          setCreateModuleDialog(true);
        }}
        label="Nuevo Modulo"
      />
    </div>
  );

  const rowExpansionTemplate = (data: Prisma.PromiseReturnType<typeof getModules>[0]) => {
    const rowExpansionHeader = (
      <>
        <div className="flex justify-between items-center flex-wrap gap-2">
          <span className="font-bold">Permisos de modulo {data.name}</span>
          <Button
            icon="pi pi-plus"
            onClick={(e) => {
              setCreatePermissionDialog(true);
            }}
            label="Nuevo Permiso"
          />
        </div>
        <CreateModuleDialog
          visible={createPermissionDialog}
          data={{
            id: data.id,
            module: data,
          }}
          onHide={() => {}}
          setVisible={setCreatePermissionDialog}
          primeReactDialogProps={{
            className: "p-0 w-full min-w-[300px] max-w-[600px]",
          }}
        />
      </>
    );

    return (
      <>
        <DataTable
          header={rowExpansionHeader}
          value={data.modulePermissions ?? []}
          stripedRows
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
        >
          <Column field="id" header="Id" />
          <Column field="name" header="Nombre" />
          <Column field="description" header="Descripción" />
        </DataTable>
      </>
    );
  };

  const allowExpansion = (rowData: Prisma.PromiseReturnType<typeof getModules>[0]) => {
    return rowData.modulePermissions.length > 0;
  };

  return (
    <>
      {" "}
      <DataTable<Prisma.PromiseReturnType<typeof getModules>>
        dataKey="id"
        scrollable
        scrollHeight="calc(100vh - 280px)"
        onRowToggle={(e) => {
          setExpandedRows(e.data as any);
        }}
        expandedRows={expandedRows}
        rowExpansionTemplate={rowExpansionTemplate}
        stripedRows
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        header={header}
        value={modules ?? []}
      >
        <Column className="w-[80px]" expander={allowExpansion} />
        <Column field="name" header="Nombre" />
        <Column field="description" header="Descripción" />
        <Column
          header="Permisos"
          body={(data: Prisma.PromiseReturnType<typeof getModules>[0]) => {
            return <>{data?.modulePermissions?.length}</>;
          }}
        />
      </DataTable>
      <NewModuleModal
        visible={createModuleDialog}
        setVisible={setCreateModuleDialog}
        onHide={() => {
          setCreateModuleDialog(false);
        }}
      ></NewModuleModal>
    </>
  );
}
