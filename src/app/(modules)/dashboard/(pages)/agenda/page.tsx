"use client";
import { useSession } from "next-auth/react";
import BasicPageWrapper from "../../(components)/basic-page-wrapper";
import { getCachedModules } from "../settings/(pages)/modules/(cached)/get-cached-modules";

export default function AgendaPage() {
  const session = useSession();

  return (
    <BasicPageWrapper>
      <h1>Agenda Page</h1>
      {JSON.stringify(session)}
    </BasicPageWrapper>
  );
}
