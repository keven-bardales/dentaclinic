import { GetAllPermissionsGroupedByModuleUseCase } from "@/features/modulePermission/domain/use-cases/getAllPermisionsGroupedByModule.use-case";
import { getCachedRoleDetail } from "../cached/getCachedRoleDetail";
import RolePerssionsListbox from "./components/role-perssions-listbox";
import RoleUsersListbox from "./components/role-users-listbox";
import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";

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
    <BasicPageWrapper className="gap-y-4">
      {await Promise.all([permissionsGrouped, rolePromise]).then(([permissionsGrouped, role]) => {
        return (
          <>
            <div className="flex w-full p-3 flex-col bg-surface-50 rounded-lg">
              <h1 className="text-4xl font-bold">{role?.data?.name}</h1>
              <p className="text-lg">Información detallada de el rol incluyendo usuarios y permisos</p>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap gap-y-5 gap-x-6 pb-5">
              <RoleUsersListbox className="w-full max-h-[500px] min-h-[500px] overflow-hidden" roleString={JSON.stringify(role.data)} />

              <RolePerssionsListbox
                className="w-full max-h-[500px] min-h-[500px] overflow-hidden"
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
