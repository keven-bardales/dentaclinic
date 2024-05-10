"use client";
import { RoleWithUsersAndPermissionsIdsDto } from "@/features/role/domain/dtos/roleWithUsersAndPermissions.dto";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { ListBox } from "primereact/listbox";
import { useToast } from "@/app/(modules)/(shared)/providers/toast-provider/toast-provider";
import Link from "next/link";
import { Tooltip } from "primereact/tooltip";

export default function RoleUsersListbox({ roleString, className }: { roleString: string; className: string }) {
  const router = useRouter();
  const originalParams = useSearchParams();
  const pathName = usePathname();
  const searchUsers = originalParams.get("searchUsers")?.toLowerCase() ?? "";
  const role = JSON.parse(roleString) as RoleWithUsersAndPermissionsIdsDto;
  const { handleActionResponse } = useToast();

  const filteredUsers = role.users.filter((user) => {
    const userName = user.name.toLowerCase();
    const userNameMatch = userName.includes(searchUsers);
    if (!searchUsers) {
      return true;
    }

    return userNameMatch;
  });

  const filterTemplate = (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Usuarios</h1>
        <p>Lista de usuarios asignados al rol</p>
      </div>

      <div className="p-inputgroup flex-1 flex-wrap md:flex-nowrap gap-y-2">
        <InputText
          className="w-full"
          onChange={(e) => {
            const value = e.target.value;
            const params = new URLSearchParams(originalParams);
            if (value) {
              params.set("searchUsers", value);
            } else {
              params.delete("searchUsers");
            }
            router.replace(`${pathName}?${params.toString()}`, {
              scroll: false,
            });
          }}
          defaultValue={searchUsers}
          placeholder="Buscar usuarios..."
        />
      </div>
    </div>
  );

  const itemTemplate = (item: (typeof role)["users"][0]) => {
    return (
      <>
        <Tooltip target=".tooltip" position="top">
          Ver detalle de usuario
        </Tooltip>
        <div className="flex flex-1 items-center gap-x-2 tooltip">
          <i className="pi pi-user"></i>
          <span className="tooltip">{item.name}</span>
        </div>
      </>
    );
  };

  return (
    <>
      <ListBox
        onChange={(e) => {
          router.push(`dashboard/settings/users/${e.value.id}`);
        }}
        emptyFilterMessage="No se encontraron usuarios"
        emptyMessage="No se encontraron usuarios"
        filterTemplate={filterTemplate}
        filter
        className={className}
        listStyle={{ maxHeight: "calc(100vh - 230px)" }}
        pt={{
          wrapper: {
            className: "scrollbar-thin",
          },
          emptyMessage: {
            className: "p-5 text-center font-bold text-lg",
          },
        }}
        options={filteredUsers ?? []}
        optionLabel="name"
        itemTemplate={itemTemplate}
      ></ListBox>
    </>
  );
}
