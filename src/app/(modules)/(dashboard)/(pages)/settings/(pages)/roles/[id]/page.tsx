import BasicPageWrapper from "@/app/(modules)/(dashboard)/components/basic-page-wrapper";
import { GetAllPermissionsGroupedByModuleUseCase } from "@/features/modulePermission/domain/use-cases/getAllPermisionsGroupedByModule.use-case";
import { getCachedRoleDetail } from "../cached/getCachedRoleDetail";
import RoleDetailHeader from "./components/role-detail-header";
import { Suspense } from "react";
import { ListBox } from "primereact/listbox";
import RolePerssionsListbox from "./components/role-perssions-listbox";

export default async function RoleDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const useCasePermissions = new GetAllPermissionsGroupedByModuleUseCase();

  const permissionsGrouped = await useCasePermissions.execute();

  const rolePromise = getCachedRoleDetail(Number(params.id));

  return (
    <BasicPageWrapper className="px-0">
      <Suspense fallback={<div>Loading...</div>}>
        <RoleDetailHeader rolePromise={rolePromise} />
      </Suspense>

      {await Promise.all([permissionsGrouped, rolePromise]).then(([permissionsGrouped, role]) => {
        return (
          <div className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-1">
              <h2 className="text-3xl font-bold sticky top-0 z-50 bg-surface px-3">Permisos</h2>
              <p className="px-3">
                {role.data?.permissionsIds.length} permisos asignados de{" "}
                {permissionsGrouped.data?.reduce((acc, module) => acc + module.permissions.length, 0)} disponibles
              </p>
            </div>
            <RolePerssionsListbox roleString={JSON.stringify(role.data)} permissionsGroupedString={JSON.stringify(permissionsGrouped.data)} />
          </div>
        );
      })}
    </BasicPageWrapper>
  );
}
