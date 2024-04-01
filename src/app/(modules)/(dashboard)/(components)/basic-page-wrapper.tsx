"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BasicPageWrapper({ children }: { children: React.ReactNode }) {
  return <section className="grow w-full p-4 px-5 flex-col">{children}</section>;
}
