import { create } from 'zustand';

interface UIStore {
  isAuthModalOpen: boolean;
  isCheckoutModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openCheckoutModal: () => void;
  closeCheckoutModal: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isAuthModalOpen: false,
  isCheckoutModalOpen: false,
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  openCheckoutModal: () => set({ isCheckoutModalOpen: true }),
  closeCheckoutModal: () => set({ isCheckoutModalOpen: false }),
}));
