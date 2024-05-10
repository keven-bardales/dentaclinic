"use client";

import { ModulePermissionDto } from "@/features/modulePermission/domain/dtos/module-permission-dto";
import { RoleWithUsersAndPermissionsIdsDto } from "@/features/role/domain/dtos/roleWithUsersAndPermissions.dto";
import { InputSwitch } from "primereact/inputswitch";

export default function RolePermissionsSwitchComponent({ roleJson, permissionJson }: { roleJson: string; permissionJson: string }) {
  const role: RoleWithUsersAndPermissionsIdsDto = JSON.parse(roleJson);
  const permission: ModulePermissionDto = JSON.parse(permissionJson);

  return <InputSwitch onChange={(e) => {}} checked={!!role?.permissionsIds.includes(permission.id)} />;
}
