import BasicPageWrapper from "@/app/(modules)/(dashboard)/components/basic-page-wrapper";
import { GetAllPermissionsGroupedByModuleUseCase } from "@/features/modulePermission/domain/use-cases/getAllPermisionsGroupedByModule.use-case";
import { getCachedRoleDetail } from "../cached/getCachedRoleDetail";
import RoleDetailHeader from "./components/role-detail-header";
import { Suspense } from "react";
import { ListBox } from "primereact/listbox";
import RolePerssionsListbox from "./components/role-perssions-listbox";
import RoleUsersListbox from "./components/role-users-listbox";

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
    <BasicPageWrapper className="py-5">
      {await Promise.all([permissionsGrouped, rolePromise]).then(([permissionsGrouped, role]) => {
        return (
          <>
            <div className="flex w-full py-5">
              <h1 className="text-4xl font-bold">{role?.data?.name}</h1>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap gap-y-5 gap-x-6 pb-5">
              <RoleUsersListbox className="w-full grow min-h-[calc(100vh-200px)]" roleString={JSON.stringify(role.data)} />

              <RolePerssionsListbox
                className="ml-auto w-full grow min-h-[calc(100vh-200px)]"
                roleString={JSON.stringify(role.data)}
                permissionsGroupedString={JSON.stringify(permissionsGrouped.data)}
              />
            </div>
          </>
        );
      })}
    </BasicPageWrapper>
  );
}
