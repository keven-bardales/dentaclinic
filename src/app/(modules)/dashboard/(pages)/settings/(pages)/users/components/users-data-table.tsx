"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { UserListDto } from "@/features/user/domain/dtos/user-list.dto";
import { UserEntity } from "@/features/user/domain/entities/user.entity";
import { Tooltip } from "primereact/tooltip";
import { Image } from "primereact/image";
import { useState } from "react";
import NewUserModal from "./new-user-moda";
import { RoleWithUsersPermissionsCountDto } from "@/features/role/domain/dtos/roleWithUsersPermissionsCount.dto";
import { RoleEntity } from "@/features/role/domain/entities/role.entity";

export default function UsersDataTable({ initialUsers, roleData }: { initialUsers: string; roleData: string }) {
  const usersParsed = JSON.parse(initialUsers ?? "[]") as UserEntity[];
  const users = usersParsed.map((user) => {
    return UserListDto.create(user);
  });
  const rolesParsed = JSON.parse(roleData ?? "[]") as RoleEntity[];
  const roles = rolesParsed?.map((role) => {
    return RoleWithUsersPermissionsCountDto.create(role);
  });
  const router = useRouter();
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="font-bold text-4xl">Lista de usuarios</span>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          e.preventDefault();
          setNewUserModalOpen(true);
        }}
        label="Nuevo usuario"
      />
    </div>
  );

  return (
    <>
      <NewUserModal
        roles={roles}
        setVisible={setNewUserModalOpen}
        onHide={() => {
          setNewUserModalOpen(false);
        }}
        visible={newUserModalOpen}
      />{" "}
      <DataTable<UserListDto[]>
        dataKey="id"
        scrollable
        paginator
        onRowClick={(e) => {
          router.push(`/dashboard/settings/users/${e.data.id}`);
        }}
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        header={header}
        value={users ?? []}
      >
        <Column
          header="Foto"
          body={(data: UserListDto) => {
            if (data?.image) {
              return (
                <Image
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  preview
                  imageClassName="cursor-pointer rounded-full"
                  height="40px"
                  width="40px"
                  src={data?.image}
                  alt={data?.name}
                  className="w-10 h-10 max-w-10 max-h-10 rounded-full"
                />
              );
            } else {
              return (
                <div className="h-10 w-10 rounded-full bg-slate-400 flex items-center justify-center">
                  <span className="text-white text-2xl">{data?.name[0]}</span>
                </div>
              );
            }
          }}
        />
        <Column field="name" header="Nombre" />
        <Column field="email" header="Correo" />
        <Column
          header="Creación"
          body={(data: UserListDto) => {
            return (
              <span>
                {data.createdAt.formatDate({
                  calendar: "gregory",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            );
          }}
        />
        <Column
          header="# de roles"
          body={(data: UserListDto) => {
            return (
              <>
                <div className="tooltip">{data.userRoles?.length}</div>
                <Tooltip target=".tooltip" position="top">
                  <div className="flex flex-col">
                    {data.userRoles?.map((role) => (
                      <span key={role.id}>{role.role?.name}</span>
                    ))}
                  </div>
                </Tooltip>
              </>
            );
          }}
        />
      </DataTable>
    </>
  );
}
