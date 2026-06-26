// store/useAuthStore.ts
import { create } from 'zustand';

interface AuthStore {
  isAuthPopoverOpen: boolean;
  openAuthPopover: () => void;
  closeAuthPopover: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthPopoverOpen: false,
  openAuthPopover: () => set({ isAuthPopoverOpen: true }),
  closeAuthPopover: () => set({ isAuthPopoverOpen: false }),
}));