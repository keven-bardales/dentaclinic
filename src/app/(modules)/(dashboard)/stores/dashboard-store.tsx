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
  isClosingSession: boolean;
  setClosingSession: (isClosingSession: boolean) => void;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
};

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      setIsMobile: (isMobile) => set({ isMobile }),
      isMobile: false,
      setClosingSession: (isClosingSession) => set({ isClosingSession }),
      isClosingSession: false,
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
      partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => !["isClosingSession"].includes(key))),
    }
  )
);
