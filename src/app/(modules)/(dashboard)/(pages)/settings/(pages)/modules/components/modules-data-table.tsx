"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useState } from "react";
import NewModuleModal from "./new-module-modal";
import { CreateModuleDialog } from "./create-module-permission";
import { ModuleWithPermissionsDto } from "@/features/module/domain/dtos/modules-with-permissions-dto";

export default function ModulesDataTable({ initialmodules }: { initialmodules: string }) {
  const modules = JSON.parse(initialmodules) as ModuleWithPermissionsDto[];

  const [createModuleDialog, setCreateModuleDialog] = useState(false);
  const [createPermissionDialog, setCreatePermissionDialog] = useState(false);
  const [expandedRows, setExpandedRows] = useState<ModuleWithPermissionsDto["modulePermissions"]>();

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="font-bold text-4xl">Lista de modulos</span>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          setCreateModuleDialog(true);
        }}
        label="Nuevo Modulo"
      />
    </div>
  );

  const rowExpansionTemplate = (data: ModuleWithPermissionsDto) => {
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
        <DataTable header={rowExpansionHeader} value={data.modulePermissions ?? []} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}>
          <Column field="id" header="Id" />
          <Column field="name" header="Nombre" />
        </DataTable>
      </>
    );
  };

  const allowExpansion = (rowData: ModuleWithPermissionsDto) => {
    if (!rowData.modulePermissions) return false;

    return rowData.modulePermissions?.length > 0;
  };

  return (
    <>
      {" "}
      <DataTable
        dataKey="id"
        scrollable
        onRowToggle={(e) => {
          setExpandedRows(e.data as any);
        }}
        expandedRows={expandedRows}
        rowExpansionTemplate={rowExpansionTemplate}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        header={header}
        value={modules ?? []}
      >
        <Column className="w-[80px]" expander={allowExpansion} />
        <Column field="name" header="Nombre" />
        <Column field="description" header="Descripción" />
        <Column
          header="Permisos"
          body={(data: ModuleWithPermissionsDto) => {
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
