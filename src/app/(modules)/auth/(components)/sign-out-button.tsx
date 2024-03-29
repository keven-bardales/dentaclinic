"use client";

import { signOut } from "next-auth/react";
import { Button } from "primereact/button";

export default function SignOutButton() {
  return (
    <Button
      onClick={() => {
        signOut();
      }}
      className="p-button-text"
      label="Cerrar sesión"
      icon={<i className="pi pi-sign-out"></i>}
    ></Button>
  );
}
