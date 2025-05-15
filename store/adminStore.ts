import { create } from "zustand";

interface AdminState {
  isAdmin: boolean;
  setAdminStatus: (status: boolean) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
    isAdmin: false,
    setAdminStatus: (status) => set({ isAdmin: status }),
  }));