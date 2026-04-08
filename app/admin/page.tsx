'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRootRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect base /admin to the modernized dashboard
    router.push('/admin/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
       <div className="text-[#C8A97E] text-[10px] uppercase font-black tracking-[0.5em] animate-pulse">
         Transitioning to Command Center...
       </div>
    </div>
  );
}
