import { getCachedPermissions } from "../../modules/(cached)/get-cached-permissions";

export default async function CreateRolePermissionWrapper() {
  const permissions = await getCachedPermissions();

  return (
    <div>
      {permissions.map((permission: any) => (
        <div key={permission.id}>
          <h1>{permission.name}</h1>
        </div>
      ))}
    </div>
  );
}
