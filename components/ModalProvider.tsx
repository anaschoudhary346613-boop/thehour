'use client';

import { useUIStore } from '@/store/useUIStore';
import { AnimatePresence } from 'framer-motion';
import AuthModal from './AuthModal';
import CheckoutModal from './CheckoutModal';

export default function ModalProvider() {
  const { isAuthModalOpen, closeAuthModal, isCheckoutModalOpen, closeCheckoutModal } = useUIStore();

  return (
    <AnimatePresence>
      {isAuthModalOpen && <AuthModal onClose={closeAuthModal} />}
      {isCheckoutModalOpen && <CheckoutModal onClose={closeCheckoutModal} />}
    </AnimatePresence>
  );
}
