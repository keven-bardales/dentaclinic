import { db } from "@/lib/db/db";
import BasicPageWrapper from "../../(components)/basic-page-wrapper";
import InscriptionsDataTable from "@/app/components/inscriptions-data-table";

export default async function AgendaPage() {
  const inscriptions = await db.inscription.findMany();

  return (
    <BasicPageWrapper>
      <h1>Agenda Page</h1>
      <InscriptionsDataTable inscriptions={inscriptions} />
    </BasicPageWrapper>
  );
}
