"use client";
import { ModulePermissionDto } from "@/features/modulePermission/domain/dtos/module-permission-dto";
import { PermissionsGroupedByModuleDto } from "@/features/modulePermission/domain/dtos/permissionsgroupedByModule.dto";
import { RoleWithUsersAndPermissionsIdsDto } from "@/features/role/domain/dtos/roleWithUsersAndPermissions.dto";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { ListBox } from "primereact/listbox";
import { removeOrAddRolePermissionsAction } from "../actions/remove-add-role-permissions.action";
import { Dropdown } from "primereact/dropdown";
import { useToast } from "@/app/(modules)/(shared)/providers/toast-provider/toast-provider";

export default function RolePerssionsListbox({ roleString, permissionsGroupedString }: { roleString: string; permissionsGroupedString: string }) {
  const router = useRouter();
  const originalParams = useSearchParams();
  const pathName = usePathname();
  const search = originalParams.get("search")?.toLowerCase() ?? "";
  const urlFilter = originalParams.get("filter") ?? "all";
  const role = JSON.parse(roleString) as RoleWithUsersAndPermissionsIdsDto;
  const permissionsGroupedOriginal = JSON.parse(permissionsGroupedString) as PermissionsGroupedByModuleDto[];
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

  const filteredPermissions = permissionsGroupedOriginal.filter((moduleValue) => {
    const moduleName = moduleValue.moduleName.toLowerCase();
    const moduleNameMatch = moduleName.includes(search);
    const somePermissionMatch = moduleValue.permissions.some((permission) => permission.name.toLowerCase().includes(search));

    if (!search && urlFilter !== "active" && urlFilter !== "inactive") {
      return true;
    }

    if (!moduleNameMatch && search && !somePermissionMatch) {
      return false;
    }

    if (search) {
      moduleValue.permissions = moduleValue.permissions.filter((permission) => permission.name.toLowerCase().includes(search));
    }

    if (urlFilter === "active") {
      moduleValue.permissions = moduleValue.permissions.filter((permission) => role.permissionsIds.includes(permission.id));
    }

    if (urlFilter === "inactive") {
      moduleValue.permissions = moduleValue.permissions.filter((permission) => !role.permissionsIds.includes(permission.id));
    }

    return moduleValue.permissions.length > 0;
  });

  const filterTemplate = (
    <div className="p-inputgroup flex-1">
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
          router.replace(`${pathName}?${params.toString()}`);
        }}
        defaultValue={search}
        placeholder="Buscar permisos..."
      />
      <span className="p-inputgroup-addon">
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
            router.replace(`${pathName}?${params.toString()}`);
          }}
          options={filterOptions}
          optionLabel="name"
          className="w-[140px]"
        />
      </span>
    </div>
  );

  const itemTemplate = (item: ModulePermissionDto) => {
    return (
      <div className="flex items-center justify-between">
        <span>{item.name}</span>
        <InputSwitch
          onChange={async (e) => {
            const response = await removeOrAddRolePermissionsAction(role.id, [item.id], e.value ? "add" : "remove");
            const deserialized = JSON.parse(response);
            handleActionResponse(deserialized);
          }}
          checked={role.permissionsIds.some((permission) => permission == item.id)}
        />
      </div>
    );
  };

  return (
    <ListBox
      filterTemplate={filterTemplate}
      filter
      className="w-full md:w-14rem"
      listStyle={{ maxHeight: "400px" }}
      pt={{
        wrapper: {
          className: "scrollbar-thin",
        },
      }}
      options={filteredPermissions}
      optionLabel="name"
      optionGroupLabel="moduleName"
      optionGroupChildren="permissions"
      itemTemplate={itemTemplate}
    ></ListBox>
  );
}
