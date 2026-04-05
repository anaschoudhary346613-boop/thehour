'use client';

import { ReactNode } from 'react';
import { CartProvider } from '@/store/cartStore';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
