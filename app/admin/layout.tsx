import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Hour — Admin Dashboard',
  description: 'Inventory and order management',
  robots: { index: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-obsidian">
      {children}
    </div>
  );
}
