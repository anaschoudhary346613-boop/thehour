'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ReactNode, createContext, useContext } from 'react';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  image2?: string;
  tags: string[];
  featured?: boolean;
  material?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isCartBouncing: boolean;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  triggerBounce: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isCartBouncing: false,

      addItem: (product) => {
        const existing = get().items.find((i) => i.id === product.id);
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          }));
        } else {
          set((s) => ({ items: [...s.items, { ...product, quantity: 1 }] }));
        }
        get().triggerBounce();
      },

      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, qty) => {
        if (qty <= 0) {
          get().removeItem(id);
          return;
        }
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      triggerBounce: () => {
        set({ isCartBouncing: true });
        setTimeout(() => set({ isCartBouncing: false }), 600);
      },

      total: () =>
        get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),

      count: () =>
        get().items.reduce((acc, i) => acc + i.quantity, 0),
    }),
    { name: 'the-hour-cart' }
  )
);

// Dummy context for Providers.tsx
const CartContext = createContext(null);
export function CartProvider({ children }: { children: ReactNode }) {
  return <CartContext.Provider value={null}>{children}</CartContext.Provider>;
}
