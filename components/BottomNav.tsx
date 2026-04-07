'use client';

import { Home, LayoutGrid, Search, User } from 'lucide-react';
import Link from 'next/link';
import { useUIStore } from '@/store/useUIStore';

export default function BottomNav() {
  const { openCategories, openSearch, openAccount } = useUIStore();

  const navItems = [
    { icon: Home, label: 'Home', onClick: undefined, href: '/' },
    { icon: LayoutGrid, label: 'Categories', onClick: openCategories, href: undefined },
    { icon: Search, label: 'Search', onClick: openSearch, href: undefined },
    { icon: User, label: 'Account', onClick: openAccount, href: undefined },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-[#0A0A0A] border-t border-[#C8A97E]/20 pb-safe pt-4 px-6 flex justify-between items-center z-[100] rounded-t-3xl md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const content = (
          <div className="flex flex-col items-center gap-1 text-[#C8A97E] transition-transform active:scale-90">
            <Icon size={22} strokeWidth={1.5} />
            <span className="text-[10px] font-medium uppercase tracking-tighter">{item.label}</span>
          </div>
        );

        if (item.href) {
          return (
            <Link key={item.label} href={item.href} className="flex-1 flex justify-center">
              {content}
            </Link>
          );
        }

        return (
          <button 
            key={item.label} 
            onClick={item.onClick}
            className="flex-1 flex justify-center outline-none"
          >
            {content}
          </button>
        );
      })}
    </nav>
  );
}

