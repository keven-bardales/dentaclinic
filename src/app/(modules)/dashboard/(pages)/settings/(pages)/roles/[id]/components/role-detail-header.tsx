export default async function RoleDetailHeader({ rolePromise }: { rolePromise: Promise<any> }) {
  const role = await rolePromise;

  return (
    <header className="p-5 flex items-center">
      <h1 className="text-2xl md:text-4xl font-bold">{role.data.name}</h1>
    </header>
  );
}
