import UsersDataTable from "./components/users-data-table";
import { getCachedUserListWithRoleCount } from "./cached/getCachedUserList";
import BasicPageWrapper from "@/app/(modules)/dashboard/(components)/basic-page-wrapper";
import { getCachedRolesWithPermissionsAndUsersCount } from "../roles/cached/getCachedRoles";

export default async function UsersPage() {
  const usersPromise = getCachedUserListWithRoleCount();

  const rolesPromise = getCachedRolesWithPermissionsAndUsersCount();

  const [users, roles] = await Promise.all([usersPromise, rolesPromise]);

  return (
    <BasicPageWrapper>
      <UsersDataTable roleData={JSON.stringify(roles?.data ?? [])} initialUsers={JSON.stringify(users?.data ?? [])} />
    </BasicPageWrapper>
  );
}
