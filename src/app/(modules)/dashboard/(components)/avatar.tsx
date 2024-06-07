"use client";

import { useSession } from "next-auth/react";
import { Avatar as PrimeAvatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { useContext, useRef } from "react";
import SignOutButton from "../../auth/(components)/sign-out-button";
import { Button } from "primereact/button";
import { PrimeReactContext } from "primereact/api";
import { Sun } from "lucide-react";

export default function Avatar() {
  const session = useSession();
  const op = useRef<OverlayPanel>(null);

  return (
    <div className="relative">
      <PrimeAvatar
        onClick={(e) => {
          if (!op.current) return;
          op.current?.toggle(e);
        }}
        label={session?.data?.user?.name ? session?.data?.user?.name[0] : ""}
      ></PrimeAvatar>
      <OverlayPanel ref={op}>
        <SignOutButton />
      </OverlayPanel>
    </div>
  );
}
