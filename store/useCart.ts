import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  brand?: string;
  price: number;
  image_url: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (item: any) => void;
  removeItem: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearCart: () => void;
  toggleCart: (open?: boolean) => void;
  getTotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);

        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...currentItems, { 
            id: item.id,
            name: item.name,
            brand: item.brand,
            price: item.price,
            image_url: item.image_url || item.image,
            quantity: 1 
          }] });
        }
        set({ isCartOpen: true });
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      incrementQuantity: (id) => {
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        });
      },

      decrementQuantity: (id) => {
        const item = get().items.find((i) => i.id === id);
        if (item && item.quantity > 1) {
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            ),
          });
        } else {
          get().removeItem(id);
        }
      },

      clearCart: () => set({ items: [] }),

      toggleCart: (open) => set((state) => ({ 
        isCartOpen: typeof open === 'boolean' ? open : !state.isCartOpen 
      })),

      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'theHour-v1',
    }
  )
);
