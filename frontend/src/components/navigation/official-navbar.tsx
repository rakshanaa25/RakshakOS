'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/shared/brand-logo';
import {
  Menu,
  X,
  LayoutDashboard,
  MapPin,
  Activity,
  Users,
  AlertOctagon,
  MessageSquare,
  Shield,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const officialNavItems = [
  { label: 'Command Center', href: '/official/command-center', icon: LayoutDashboard },
  { label: 'Response Operations', href: '/official/response-operations', icon: MapPin },
  { label: 'Agent Activity', href: '/official/agent-activity', icon: Activity },
  { label: 'Teams & Resources', href: '/official/teams-resources', icon: Users },
  { label: 'Exceptions / Approvals', href: '/official/exceptions-approvals', icon: AlertOctagon },
  { label: 'Communications', href: '/official/communications', icon: MessageSquare },
];

export const OfficialNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Brand & Context */}
        <div className="flex items-center gap-4">
          <BrandLogo role="Official Command Center" size="md" />
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-200">
            <Badge variant="outline" className="border-slate-300 text-slate-700 bg-slate-50 font-sans">
              <Shield className="w-3 h-3 mr-1 text-slate-700" />
              EOC Authority Desk
            </Badge>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1">
          {officialNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-sans font-medium transition-colors ${
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
        </nav>

        {/* Right Actions & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link href="/auth/official" className="hidden sm:inline-block">
            <Button variant="outline" size="sm" className="text-xs font-sans text-slate-700">
              Official SSO Auth
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
            Official Navigation (6 Screens)
          </div>
          {officialNavItems.map((item) => {
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
          <div className="pt-2 border-t border-slate-200 mt-2">
            <Link
              href="/auth/official"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center text-xs font-sans py-2 rounded-md bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200"
            >
              Official SSO Authentication Placeholder
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
