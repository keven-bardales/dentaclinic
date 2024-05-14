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
import { useState } from "react";
import { Card } from "primereact/card";

export default function RolePerssionsListbox({ roleString, permissionsGroupedString }: { roleString: string; permissionsGroupedString: string }) {
  const router = useRouter();
  const originalParams = useSearchParams();
  const pathName = usePathname();
  const search = originalParams.get("search")?.toLowerCase() ?? "";
  const urlFilter = originalParams.get("filter") ?? "all";
  const role = JSON.parse(roleString) as RoleWithUsersAndPermissionsIdsDto;
  const permissionsGroupedOriginal = JSON.parse(permissionsGroupedString) as PermissionsGroupedByModuleDto[];
  const [selectedPermission, setSelectedPermission] = useState<ModulePermissionDto | null>(null);
  const { handleActionResponse } = useToast();
  const [state, setState] = useState({
    updatingPermissionsIds: [] as number[],
  });

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

  const filteredPermissions = permissionsGroupedOriginal
    .filter((moduleWithPermissions) => {
      const somePermissionNameMatches = moduleWithPermissions.permissions.some((permission) => permission.name.toLowerCase().includes(search));

      const moduleNameMatches = moduleWithPermissions.moduleName.toLowerCase().includes(search);

      if (search) {
        return somePermissionNameMatches || moduleNameMatches;
      } else {
        return true;
      }
    })
    .map((moduleWithPermissions) => {
      return {
        ...moduleWithPermissions,
        permissions: moduleWithPermissions.permissions.filter((permission) => {
          if (selectedFilter?.value === "all") {
            return true;
          } else if (selectedFilter?.value === "active") {
            return role.permissionsIds.includes(permission.id);
          } else {
            return !role.permissionsIds.includes(permission.id);
          }
        }),
      };
    })
    .filter((moduleWithPermissions) => moduleWithPermissions.permissions.length > 0);

  const filterTemplate = (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Permisos</h1>
        <p>
          {role.permissionsIds.length} permisos activos de {permissionsGroupedOriginal.reduce((acc, module) => acc + module.permissions.length, 0)}
        </p>
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
          placeholder="Buscar permisos..."
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

  return (
    <div className="w-full max-h-[500px] min-h-[500px] overflow-hidden flex flex-col gap-y-4 p-4 border-2">
      {filterTemplate}
      <div className="overflow-auto">
        {filteredPermissions.map((modulepermission) => {
          return (
            <div key={`${modulepermission.moduleName}`}>
              <h2 className="text-lg">{modulepermission.moduleName}</h2>
              <hr className="w-full h-[3px]" />

              <div className="flex flex-col">
                {modulepermission.permissions.map((permission) => {
                  return (
                    <div key={permission.id} className="flex justify-between hover:bg-highlight p-3">
                      <span>{permission.name}</span>
                      <InputSwitch
                        disabled={state.updatingPermissionsIds.includes(permission.id)}
                        onChange={async (e) => {
                          e.stopPropagation();
                          if (state.updatingPermissionsIds.includes(permission.id)) return;
                          setState({ ...state, updatingPermissionsIds: [...state.updatingPermissionsIds, permission.id] });
                          const response = await removeOrAddRolePermissionsAction(role.id, [permission.id], e.value ? "add" : "remove");
                          const deserialized = JSON.parse(response);
                          handleActionResponse(deserialized);
                          setTimeout(() => {
                            setState({ ...state, updatingPermissionsIds: state.updatingPermissionsIds.filter((id) => id !== permission.id) });
                          }, 500);
                        }}
                        checked={role.permissionsIds.some((roleId) => roleId == permission.id)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
