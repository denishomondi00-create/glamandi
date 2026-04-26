import { create } from "zustand";

type PortalState = {
  activePortal: "admin" | "tenant" | "landlord" | null;
  setActivePortal: (portal: PortalState["activePortal"]) => void;
};

export const usePortalStore = create<PortalState>((set) => ({
  activePortal: null,
  setActivePortal: (activePortal) => set({ activePortal }),
}));
