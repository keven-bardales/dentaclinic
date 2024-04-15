"use client";
import { RoleWithUsersAndPermissionsIdsDto } from "@/features/role/domain/dtos/roleWithUsersAndPermissions.dto";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { ListBox } from "primereact/listbox";
import { Dropdown } from "primereact/dropdown";
import { useToast } from "@/app/(modules)/(shared)/providers/toast-provider/toast-provider";

export default function RoleUsersListbox({ roleString, className }: { roleString: string; className: string }) {
  const router = useRouter();
  const originalParams = useSearchParams();
  const pathName = usePathname();
  const search = originalParams.get("search")?.toLowerCase() ?? "";
  const urlFilter = originalParams.get("filter") ?? "all";
  const role = JSON.parse(roleString) as RoleWithUsersAndPermissionsIdsDto;
  const { handleActionResponse } = useToast();

  const filterOptions = [
    {
      name: "Todos",
      value: "all",
    },
    {
      name: "Activos",
      value: "active",
    },
    {
      name: "Inactivos",
      value: "inactive",
    },
  ];

  const selectedFilter = filterOptions.find((option) => option.value === urlFilter);

  const filterTemplate = (
    <div className="flex flex-col gap-y-3">
      <div>
        <h1 className="text-3xl font-bold">Usuarios</h1>
      </div>

      <div className="p-inputgroup flex-1 flex-wrap md:flex-nowrap gap-y-2">
        <InputText
          className="w-full"
          onChange={(e) => {
            const value = e.target.value;
            const params = new URLSearchParams(originalParams);
            if (value) {
              params.set("search", value);
            } else {
              params.delete("search");
            }
            router.replace(`${pathName}?${params.toString()}`, {
              scroll: false,
            });
          }}
          defaultValue={search}
          placeholder="Buscar usuarios..."
        />
        <span className="ml-auto md:ml-0">
          <Dropdown
            value={selectedFilter?.value ?? filterOptions[0].value}
            onChange={(e) => {
              const value = e.value;
              const params = new URLSearchParams(originalParams);
              if (value !== "all") {
                params.set("filter", value);
              } else {
                params.delete("filter");
              }
              router.replace(`${pathName}?${params.toString()}`, {
                scroll: false,
              });
            }}
            options={filterOptions}
            optionLabel="name"
            className="w-[140px]"
          />
        </span>
      </div>
    </div>
  );

  const itemTemplate = (item: (typeof role)["users"][0]) => {
    return (
      <div className="flex items-center justify-between">
        <span>{item.name}</span>
      </div>
    );
  };

  return (
    <ListBox
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
      options={role.users}
      optionLabel="name"
      itemTemplate={itemTemplate}
    ></ListBox>
  );
}
