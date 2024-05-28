"use client";

import { signOut } from "next-auth/react";
import { Button } from "primereact/button";
import { useDashboardStore } from "../../dashboard/(stores)/dashboard-store";
import { deleteCookie } from "@/lib/utils/set-cookie";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const setClosingSession = useDashboardStore((state) => state.setClosingSession);
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        setClosingSession(true);

        const artificialDelay = new Promise((resolve) => {
          setTimeout(() => {
            resolve(null);
          }, 1000);
        });

        deleteCookie("rememberme");

        await artificialDelay;

        const signOutPromise = signOut({
          redirect: false,
        });
        signOutPromise.then(() => {
          setClosingSession(false);
          router.push("/auth/sign-in");
        });
      }}
      className="p-button-text w-full h-full"
      label="Cerrar sesión"
      severity="danger"
      icon={<i className="pi pi-sign-out"></i>}
    ></Button>
  );
}
