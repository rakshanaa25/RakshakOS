import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/shared/brand-logo';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, ArrowRight, Activity, Lock, Building2 } from 'lucide-react';
import { Footer } from '@/components/navigation/footer';

export default function RootPortalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* Header Bar */}
      <header className="border-b border-slate-200 bg-white px-4 md:px-8 py-4 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <BrandLogo size="lg" />
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-sans text-slate-600 bg-slate-50">
              Emergency Response Platform
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-12">
        {/* Product Identity Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/60 border border-slate-300 text-slate-800 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5 text-slate-900" />
            <span>Autonomous Emergency Response & Field Operations</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Rakshak<span className="text-amber-600">OS</span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 font-sans leading-relaxed">
            An integrated multi-role system coordinating emergency operations centers, rescue teams, field volunteers, and NGO networks during disaster response operations.
          </p>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-sans text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>System Operational • OBSERVE → ASSESS → PLAN → EXECUTE → MONITOR → REPLAN</span>
          </div>
        </div>

        {/* Role Selection Options */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Select Your Role to Access RakshakOS
            </h2>
            <p className="text-xs text-slate-500 font-sans mt-1">
              Choose your operational capacity to proceed with authentication and onboarding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Official Access Card */}
            <Card className="border-slate-200 hover:border-slate-400 transition-all shadow-sm flex flex-col justify-between">
              <CardHeader className="p-6 space-y-3 bg-slate-50/50 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-slate-900 text-amber-400">
                    <Shield size={24} />
                  </div>
                  <Badge variant="outline" className="font-sans text-slate-700 bg-white">
                    Authorized Officials
                  </Badge>
                </div>

                <div className="space-y-1">
                  <CardTitle className="text-xl font-bold text-slate-900">
                    Official Command Center
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-xs">
                    Emergency Operations Center (EOC), Police, Fire & Rescue, Medical, and Public Works commanders.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-4 text-xs font-sans text-slate-700 flex-1">
                <p className="leading-relaxed">
                  Access overall disaster operational heatmaps, incident management, real-time agent event streams, resource allocation rosters, and human-in-the-loop exception approvals.
                </p>

                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Supported Agency Roles:
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">EOC / Government</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">Police</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">Fire & Rescue</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">Medical</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">Public Works</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-lg">
                <Link href="/auth/official" className="w-full">
                  <Button className="w-full justify-between bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs">
                    <span className="flex items-center gap-2">
                      <Lock size={14} /> Official Sign In & Auth
                    </span>
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Volunteer Access Card */}
            <Card className="border-slate-200 hover:border-slate-400 transition-all shadow-sm flex flex-col justify-between">
              <CardHeader className="p-6 space-y-3 bg-slate-50/50 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-emerald-700 text-white">
                    <Users size={24} />
                  </div>
                  <Badge variant="success" className="font-sans">
                    Responders & NGOs
                  </Badge>
                </div>

                <div className="space-y-1">
                  <CardTitle className="text-xl font-bold text-slate-900">
                    Volunteer Response Center
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-xs">
                    Individual field responders and NGO coordinators executing rescue missions and reporting ground truth.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-4 text-xs font-sans text-slate-700 flex-1">
                <p className="leading-relaxed">
                  Register as an individual volunteer or NGO leader to receive assigned missions, submit ground truth reports (survivor, injury, road blocked), view assigned equipment, and update operational availability.
                </p>

                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Registration Options:
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium">
                      Individual Field Responder
                    </span>
                    <span className="px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800 font-medium flex items-center gap-1">
                      <Building2 size={12} /> NGO Coordinator & Team Roster
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-lg">
                <Link href="/auth/volunteer" className="w-full">
                  <Button className="w-full justify-between bg-emerald-700 hover:bg-emerald-600 text-white font-sans text-xs">
                    <span className="flex items-center gap-2">
                      <Users size={14} /> Register as Volunteer / NGO Leader
                    </span>
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
