"use client";

import { cn } from "@/lib/utils/cn";
import { SidebarModes, useDashboardStore } from "../(stores)/dashboard-store";

export default function MainContentWrapper({ children }: { children: React.ReactNode }) {
  const sidebarMode = useDashboardStore((state) => state.sidebarMode);

  return (
    <section
      className={cn("w-full flex flex-col md:ml-[18rem] h-full transition-all duration-300 overflow-hidden", {
        "md:ml-0": sidebarMode == SidebarModes.HIDDEN,
      })}
    >
      {children}
    </section>
  );
}
