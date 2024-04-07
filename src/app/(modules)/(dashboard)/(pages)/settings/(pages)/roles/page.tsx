import BasicPageWrapper from "@/app/(modules)/(dashboard)/(components)/basic-page-wrapper";
import RolesDataTable from "./(components)/roles-data-table";
import { getCachedRoles } from "./(cached)/getCachedRoles";
import CreateRolePermissionWrapper from "./(components)/create-role-permissions-wrapper";

export default async function RolesPage() {
  const roles = await getCachedRoles();

  return (
    <BasicPageWrapper>
      <RolesDataTable roles={roles}>
        <CreateRolePermissionWrapper />
      </RolesDataTable>
    </BasicPageWrapper>
  );
}
