"use client";
import { Prisma } from "@prisma/client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useState } from "react";
import { getRoles } from "../queries/getRoles";
import { CreateRolePermissionDialog } from "./create-role-permission-dialog";
import NewRoleModal from "./new-role-modal";

export default function RolesDataTable({
  roles,
  children,
}: {
  roles: Prisma.PromiseReturnType<typeof getRoles>;

  children: React.ReactNode;
}) {
  const [newRoleDialog, setnewRoleDialog] = useState(false);
  const [createRolePermissionDialog, setcreateRolePermissionDialog] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Prisma.PromiseReturnType<typeof getRoles>[0][] | Prisma.PromiseReturnType<typeof getRoles>[0][]>();

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="font-bold text-xl">Roles</span>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          setnewRoleDialog(true);
        }}
        label="Nuevo rol"
      />
    </div>
  );

  const rowExpansionTemplate = (data: Prisma.PromiseReturnType<typeof getRoles>[0]) => {
    const rowExpansionHeader = (
      <>
        <div className="flex justify-between items-center flex-wrap gap-2">
          <span className="font-bold">Permisos de rol {data.name}</span>
          <Button
            icon="pi pi-plus"
            onClick={(e) => {
              setcreateRolePermissionDialog(true);
            }}
            label="Nuevo Permiso"
          />
        </div>
        <CreateRolePermissionDialog
          visible={createRolePermissionDialog}
          data={{
            id: data.id,
            role: data,
          }}
          onHide={() => {}}
          setVisible={setcreateRolePermissionDialog}
          primeReactDialogProps={{
            className: "p-0 w-full min-w-[300px] max-w-[600px]",
          }}
        />
      </>
    );

    return (
      <>
        <DataTable header={rowExpansionHeader} value={data.rolePermissions ?? []} stripedRows paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
          <Column field="name" header="Nombre" />
          <Column field="module" header="Modulo" />
        </DataTable>
      </>
    );
  };

  const allowExpansion = (rowData: Prisma.PromiseReturnType<typeof getRoles>[0]) => {
    return rowData.rolePermissions.length > 0;
  };

  return (
    <>
      {" "}
      <DataTable<Prisma.PromiseReturnType<typeof getRoles>>
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
        value={roles ?? []}
      >
        <Column className="w-[80px]" expander={allowExpansion} />
        <Column field="name" header="Nombre" />
        <Column field="description" header="Descripción" />
        <Column
          header="Permisos"
          body={(data: Prisma.PromiseReturnType<typeof getRoles>[0]) => {
            return <>{data?.rolePermissions?.length}</>;
          }}
        />
      </DataTable>
      <NewRoleModal
        visible={newRoleDialog}
        setVisible={setnewRoleDialog}
        onHide={() => {
          setnewRoleDialog(false);
        }}
      ></NewRoleModal>
      {children}
    </>
  );
}
