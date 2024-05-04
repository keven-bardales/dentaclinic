"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useState } from "react";
import NewRoleModal from "./new-role-modal";
import { RoleWithUsersPermissionsCountDto } from "@/features/role/domain/dtos/roleWithUsersPermissionsCount.dto";
import { useRouter } from "next/navigation";

export default function RolesDataTable({ initialRoles }: { initialRoles: string }) {
  const roles = JSON.parse(initialRoles ?? "[]") as RoleWithUsersPermissionsCountDto[];
  const [newRoleDialog, setnewRoleDialog] = useState(false);
  const router = useRouter();

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="font-bold text-4xl">Lista de roles</span>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          setnewRoleDialog(true);
        }}
        label="Nuevo rol"
      />
    </div>
  );

  return (
    <>
      {" "}
      <DataTable<RoleWithUsersPermissionsCountDto[]>
        dataKey="id"
        scrollable
        paginator
        onRowClick={(e) => {
          router.push(`/settings/roles/${e.data.id}`);
        }}
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        header={header}
        value={roles ?? []}
      >
        <Column className="w-[80px]" />
        <Column field="name" header="Nombre" />
        <Column field="description" header="Descripción" />
        <Column
          header="Permisos"
          body={(data: RoleWithUsersPermissionsCountDto) => {
            return <>{data?.permissionsCount}</>;
          }}
        />
        <Column
          header="Usuarios"
          body={(data: RoleWithUsersPermissionsCountDto) => {
            return <>{data?.usersCount}</>;
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
    </>
  );
}
