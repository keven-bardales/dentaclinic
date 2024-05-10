import RolesDataTable from "./components/roles-data-table";
import { getCachedRolesWithPermissionsAndUsersCount } from "./cached/getCachedRoles";
import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";

export default async function RolesPage() {
  const roles = await getCachedRolesWithPermissionsAndUsersCount();

  return (
    <BasicPageWrapper>
      <RolesDataTable initialRoles={JSON.stringify(roles?.data)}></RolesDataTable>
    </BasicPageWrapper>
  );
}
