'use client';

import { Home, ShoppingBag, Search, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/store/useUIStore';
import { useCart } from '@/store/useCart';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';

export default function BottomNav() {
  const { openAuthModal } = useUIStore();
  const { toggleCart, items } = useCart();
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/shop' },
  ];

  return (
    <div className="fixed bottom-0 w-full h-16 bg-black border-t border-white/10 flex justify-around items-center text-gray-400 z-50 md:hidden">
      <div className="flex items-center justify-around h-full w-full px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <Link 
              key={item.label}
              href={item.path}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive ? 'text-[#C8A97E]' : 'text-[#C8A97E]/50'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2 : 1.5} />
            </Link>
          );
        })}

        {/* Global Cart Button */}
        <button 
          onClick={() => toggleCart(true)}
          className="relative flex flex-col items-center justify-center gap-1 transition-colors text-[#C8A97E]/50 hover:text-[#C8A97E]"
        >
          <ShoppingBag size={24} strokeWidth={1.5} />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#C8A97E] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>

        {/* Profile Button */}
        <button 
          onClick={openAuthModal}
          className="flex flex-col items-center justify-center gap-1 transition-colors text-[#C8A97E]/50 hover:text-[#C8A97E]"
        >
          <User size={24} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

