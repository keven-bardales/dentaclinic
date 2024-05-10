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
  isLogginRememberme: boolean;
  setisLogginRememberme: (isLogginRememberme: boolean) => void;
  modulesState: { name: string; isOpen: boolean }[];
  addNewModuleState: (payload: { name: string; isOpen: boolean }) => void;
};

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      modulesState: [],
      addNewModuleState: (payload: { name: string; isOpen: boolean }) =>
        set((state) => ({ ...state, modulesState: [...state.modulesState.filter((item) => item.name != payload.name), payload] })),
      setIsMobile: (isMobile) => set({ isMobile }),
      isMobile: false,
      setClosingSession: (isClosingSession) => set({ isClosingSession }),
      isClosingSession: false,
      sidebarMode: SidebarModes.HIDDEN,
      lastMode: SidebarModes.HIDDEN,
      isLogginRememberme: false,
      setisLogginRememberme: (isLogginRememberme) => set({ isLogginRememberme }),
      setSidebarMode: (mode) =>
        set((state) => ({
          ...state,
          lastMode: state.sidebarMode,
          sidebarMode: mode,
        })),
    }),
    {
      name: "dashboard-store",
      partialize: (state) =>
        Object.fromEntries(Object.entries(state).filter(([key]) => !["isClosingSession"].includes(key) || ["isLogginRememberme"].includes(key))),
    }
  )
);
