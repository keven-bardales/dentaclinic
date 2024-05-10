"use client";
import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { useDashboardStore } from "../(stores)/dashboard-store";

export default function ClosingSessionLoader() {
  const closingSession = useDashboardStore((state) => state.isClosingSession);

  if (!closingSession) return null;

  return (
    <div className="h-screen w-full text-4xl font-bold absolute z-[9999] flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="text-white flex flex-col items-center">
        <ProgressSpinner style={{ width: "50px", height: "50px" }} strokeWidth="4" animationDuration=".5s" />
        <p className="mt-2">Cerrando sesión...</p>
      </div>
    </div>
  );
}
