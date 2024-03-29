"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum SidebarModes {
  HIDDEN = 0,
  OPEN = 1,
}

type DashboardStore = {
  sidebarMode: SidebarModes;
  lastMode: SidebarModes;
  setSidebarMode: (mode: SidebarModes) => void;
};

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      sidebarMode: SidebarModes.HIDDEN,
      lastMode: SidebarModes.HIDDEN,
      setSidebarMode: (mode) =>
        set((state) => ({
          ...state,
          lastMode: state.sidebarMode,
          sidebarMode: mode,
        })),
    }),
    {
      name: "dashboard-store",
    }
  )
);
