"use client";
import { ReactNode } from "react";

import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";

export default function MainProviders({ children }: { children: ReactNode }) {
  return (
    <PrimeReactProvider
      value={{
        ripple: true,
      }}
    >
      {children}
    </PrimeReactProvider>
  );
}
