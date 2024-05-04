"use client";

import { signOut } from "next-auth/react";
import { Button } from "primereact/button";
import { useDashboardStore } from "../../(dashboard)/stores/dashboard-store";

export default function SignOutButton() {
  const setClosingSession = useDashboardStore((state) => state.setClosingSession);

  return (
    <Button
      onClick={async () => {
        setClosingSession(true);

        const artificialDelay = new Promise((resolve) => {
          setTimeout(() => {
            resolve(null);
          }, 1000);
        });

        await artificialDelay;

        const signOutPromise = signOut();
        signOutPromise.then(() => {
          setClosingSession(false);
        });
      }}
      className="p-button-text w-full h-full"
      label="Cerrar sesión"
      severity="danger"
      icon={<i className="pi pi-sign-out"></i>}
    ></Button>
  );
}
