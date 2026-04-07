import { create } from 'zustand';

interface UIStore {
  isAccountOpen: boolean;
  isSearchOpen: boolean;
  isCategoriesOpen: boolean;
  isCheckoutModalOpen: boolean;
  
  openAccount: () => void;
  closeAccount: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openCategories: () => void;
  closeCategories: () => void;
  openCheckoutModal: () => void;
  closeCheckoutModal: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isAccountOpen: false,
  isSearchOpen: false,
  isCategoriesOpen: false,
  isCheckoutModalOpen: false,
  
  openAccount: () => set({ isAccountOpen: true }),
  closeAccount: () => set({ isAccountOpen: false }),
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  openCategories: () => set({ isCategoriesOpen: true }),
  closeCategories: () => set({ isCategoriesOpen: false }),
  openCheckoutModal: () => set({ isCheckoutModalOpen: true }),
  closeCheckoutModal: () => set({ isCheckoutModalOpen: false }),
}));
