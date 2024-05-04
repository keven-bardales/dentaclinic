import BasicPageWrapper from "@/app/(modules)/(dashboard)/components/basic-page-wrapper";
import ModulesDataTable from "./components/modules-data-table";
import { getCachedModules } from "./cached/get-cached-modules";

export default async function ModulesPage() {
  const modules = await getCachedModules();

  return (
    <BasicPageWrapper>
      <ModulesDataTable initialmodules={JSON.stringify(modules) as any} />
    </BasicPageWrapper>
  );
}
