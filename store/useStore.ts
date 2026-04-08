import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  image_url: string;
  quantity: number;
}

interface BoutiqueState {
  // Cart State
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;

  // UI State
  isCartOpen: boolean;
  isAuthOpen: boolean;
  toggleCart: (open?: boolean) => void;
  toggleAuth: (open?: boolean) => void;

  // Auth State (Simplified session cache)
  user: any | null;
  setUser: (user: any | null) => void;
}

export const useStore = create<BoutiqueState>()(
  persist(
    (set, get) => ({
      // Cart Initial
      cart: [],
      addToCart: (item) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((i) => i.id === item.id);
        
        if (existingItem) {
          set({
            cart: currentCart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ cart: [...currentCart, item] });
        }
        // Auto-open cart for premium feedback
        set({ isCartOpen: true });
      },
      removeFromCart: (id) => set({ cart: get().cart.filter((i) => i.id !== id) }),
      updateQuantity: (id, quantity) => set({
        cart: get().cart.map((i) => 
          i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
        )
      }),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0),

      // UI Initial
      isCartOpen: false,
      isAuthOpen: false,
      toggleCart: (open) => set((state) => ({ isCartOpen: open ?? !state.isCartOpen })),
      toggleAuth: (open) => set((state) => ({ isAuthOpen: open ?? !state.isAuthOpen })),

      // Auth Initial
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'the-hour-storage',
      partialize: (state) => ({ cart: state.cart }), // Only persist cart
    }
  )
);
