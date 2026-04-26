import { create } from "zustand";

type AppState = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  syncPendingCount: number;
  setSyncPendingCount: (count: number) => void;
};

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  syncPendingCount: 0,
  setSyncPendingCount: (syncPendingCount) => set({ syncPendingCount }),
}));
