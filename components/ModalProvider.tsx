'use client';

import React from 'react';
import { useUIStore } from '@/store/useUIStore';
import { AnimatePresence } from 'framer-motion';
import SearchModal from './SearchModal';
import CategoriesModal from './CategoriesModal';
import AccountModal from './AccountModal';
import CheckoutModal from './CheckoutModal';

export default function ModalProvider() {
  const { 
    isSearchOpen, 
    isCategoriesOpen, 
    isAccountOpen, 
    isCheckoutModalOpen,
    closeCheckoutModal 
  } = useUIStore();

  return (
    <AnimatePresence>
      {isSearchOpen && <SearchModal key="search-modal" />}
      {isCategoriesOpen && <CategoriesModal key="categories-modal" />}
      {isAccountOpen && <AccountModal key="account-modal" />}
      {isCheckoutModalOpen && <CheckoutModal key="checkout-modal" onClose={closeCheckoutModal} />}
    </AnimatePresence>
  );
}
