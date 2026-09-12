import React from 'react';
import { VolunteerNavbar } from '@/components/navigation/volunteer-navbar';
import { Footer } from '@/components/navigation/footer';

export const metadata = {
  title: 'RakshakOS - Volunteer Response Center',
  description: 'Field Operations & Volunteer Rescue Portal',
};

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500 selection:text-zinc-950">
      <VolunteerNavbar />
      <main className="flex-1 pb-8">{children}</main>
      <Footer />
    </div>
  );
}
