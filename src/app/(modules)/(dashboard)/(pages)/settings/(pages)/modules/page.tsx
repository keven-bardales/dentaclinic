import BasicPageWrapper from "@/app/(modules)/(dashboard)/(components)/basic-page-wrapper";
import { getModules } from "./(queries)/getModules";
import ModulesDataTable from "./(components)/modules-data-table";

export default async function ModulesPage() {
  const modules = await getModules();

  return (
    <BasicPageWrapper>
      <ModulesDataTable modules={modules} />
    </BasicPageWrapper>
  );
}
