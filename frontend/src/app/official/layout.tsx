import React from 'react';
import { OfficialNavbar } from '@/components/navigation/official-navbar';
import { Footer } from '@/components/navigation/footer';

export const metadata = {
  title: 'RakshakOS - Official Command Center',
  description: 'Emergency Operations Center Command & Response System',
};

export default function OfficialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500 selection:text-zinc-950">
      <OfficialNavbar />
      <main className="flex-1 pb-8">{children}</main>
      <Footer />
    </div>
  );
}
