"use client";
import { useSession } from "next-auth/react";
import BasicPageWrapper from "../../(components)/basic-page-wrapper";
import { getCachedModules } from "../settings/(pages)/modules/(cached)/get-cached-modules";
import { getCurrentUserSession } from "@/app/(modules)/(shared)/(actions)/current-user";
import { useEffect } from "react";

export default function AgendaPage() {
  const session = useSession();

  const getUser = async () => {
    const user = await getCurrentUserSession();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <BasicPageWrapper>
      <h1>Agenda Page</h1>
      {JSON.stringify(session)}
    </BasicPageWrapper>
  );
}
