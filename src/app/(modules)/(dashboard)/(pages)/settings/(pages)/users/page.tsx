import BasicPageWrapper from "@/app/(modules)/(dashboard)/components/basic-page-wrapper";
import UsersDataTable from "./components/users-data-table";
import { getCachedUserListWithRoleCount } from "./cached/getCachedUserList";

export default async function UsersPage() {
  const users = await getCachedUserListWithRoleCount();

  return (
    <BasicPageWrapper>
      <UsersDataTable initialUsers={JSON.stringify(users?.data ?? [])} />
    </BasicPageWrapper>
  );
}
