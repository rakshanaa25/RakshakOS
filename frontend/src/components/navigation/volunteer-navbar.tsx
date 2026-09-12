'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/shared/brand-logo';
import {
  Menu,
  X,
  Home,
  Target,
  FileText,
  Users,
  Box,
  MessageSquare,
  UserCheck,
  Building2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const volunteerNavItems = [
  { label: 'Home', href: '/volunteer/home', icon: Home },
  { label: 'My Mission', href: '/volunteer/my-mission', icon: Target },
  { label: 'Report Situation', href: '/volunteer/report-situation', icon: FileText },
  { label: 'Team', href: '/volunteer/team', icon: Users },
  { label: 'Resources', href: '/volunteer/resources', icon: Box },
  { label: 'Communication', href: '/volunteer/communication', icon: MessageSquare },
  { label: 'Profile / Availability', href: '/volunteer/profile-availability', icon: UserCheck },
];

export const VolunteerNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Brand & Context */}
        <div className="flex items-center gap-4">
          <BrandLogo role="Volunteer Response Center" size="md" />
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-200">
            <Badge variant="success" className="font-sans">
              Responder Active
            </Badge>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1">
          {volunteerNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-sans font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-white' : 'text-slate-500'} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <Link
            href="/volunteer/ngo"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-sans font-medium border transition-colors ${
              pathname === '/volunteer/ngo'
                ? 'bg-sky-50 text-sky-800 border-sky-300 font-semibold'
                : 'border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Building2 size={14} className="text-sky-600" />
            <span>NGO Layer</span>
          </Link>
        </nav>

        {/* Right Actions & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link href="/auth/volunteer" className="hidden sm:inline-block">
            <Button variant="outline" size="sm" className="text-xs font-sans text-slate-700">
              Registration Portal
            </Button>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md border border-slate-200 bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none xl:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg">
          <div className="px-2 py-1 text-[11px] font-sans font-semibold uppercase text-slate-500 tracking-wider">
            Volunteer Navigation (7 Screens)
          </div>
          {volunteerNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-sans transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-slate-500'} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-2 border-t border-slate-200 space-y-2">
            <Link
              href="/volunteer/ngo"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-center text-xs font-sans py-2 rounded-md bg-sky-50 border border-sky-200 text-sky-800 font-medium hover:bg-sky-100"
            >
              <Building2 size={14} />
              NGO Coordinator Management Layer
            </Link>

            <Link
              href="/auth/volunteer"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center text-xs font-sans py-2 rounded-md bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200"
            >
              Volunteer Authentication Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
