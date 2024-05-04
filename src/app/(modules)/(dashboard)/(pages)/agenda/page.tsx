import BasicPageWrapper from "../../components/basic-page-wrapper";
import { getCachedModules } from "../settings/(pages)/modules/cached/get-cached-modules";

export default async function AgendaPage() {
  const modules = await getCachedModules();

  return (
    <BasicPageWrapper>
      <h1>Agenda Page</h1>
      {Math.random()}
      {modules.map((module) => (
        <div key={module.id}>
          <h2>{module.name}</h2>
        </div>
      ))}
    </BasicPageWrapper>
  );
}
