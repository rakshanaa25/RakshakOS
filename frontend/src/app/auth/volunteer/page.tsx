'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BrandLogo } from '@/components/shared/brand-logo';
import { RoleSelector } from '@/components/auth/RoleSelector';
import { IndividualVolunteerForm } from '@/components/auth/IndividualVolunteerForm';
import { NgoCoordinatorForm } from '@/components/auth/NgoCoordinatorForm';
import { VolunteerRoleType, IndividualVolunteerRegistration, NgoCoordinatorRegistration } from '@/lib/types/auth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle2, Shield, ArrowRight, RefreshCw } from 'lucide-react';
import { Footer } from '@/components/navigation/footer';

export default function VolunteerAuthPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<VolunteerRoleType>('individual');
  const [isLoading, setIsLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    role: VolunteerRoleType;
    data: IndividualVolunteerRegistration | NgoCoordinatorRegistration;
    cvDetails?: { name: string; size: number } | null;
    timestamp: string;
  } | null>(null);

  const handleIndividualSubmit = (
    formData: IndividualVolunteerRegistration,
    cvDetails?: { name: string; size: number } | null
  ) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmittedData({
        role: 'individual',
        data: formData,
        cvDetails: cvDetails,
        timestamp: new Date().toISOString(),
      });
    }, 800);
  };

  const handleNgoSubmit = (formData: NgoCoordinatorRegistration) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmittedData({
        role: 'ngo_coordinator',
        data: formData,
        timestamp: new Date().toISOString(),
      });
    }, 900);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* Header Bar */}
      <header className="border-b border-slate-200 bg-white px-4 md:px-8 py-4 sticky top-0 z-50 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <BrandLogo size="md" role="Volunteer Onboarding Portal" />
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2 text-xs font-sans text-slate-700">
                <ArrowLeft size={14} /> Back to Portal
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Container */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 md:py-12 w-full space-y-8">
        {/* Page Heading */}
        <div className="p-6 rounded-lg border border-slate-200 bg-white space-y-2 font-sans shadow-2xs">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success">Field Responder Registration</Badge>
            <Badge variant="outline">RakshakOS Onboarding</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Volunteer & NGO Coordinator Registration
          </h1>
          <p className="text-xs md:text-sm text-slate-600 font-sans leading-relaxed">
            Register as an individual emergency field responder or onboard an NGO organization roster.
          </p>
        </div>

        {/* Prototype Registration Success Banner / Modal */}
        {submittedData ? (
          <Card className="border-emerald-300 bg-white font-sans text-xs shadow-md">
            <CardHeader className="border-b border-slate-100 bg-emerald-50/60 p-6 space-y-2 rounded-t-lg">
              <div className="flex items-center justify-between">
                <Badge variant="success" className="font-sans">
                  Registration Prototype Confirmed
                </Badge>
                <span className="text-xs text-slate-500 font-mono">{new Date(submittedData.timestamp).toLocaleTimeString()}</span>
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 size={24} className="text-emerald-700" />
                {submittedData.role === 'individual'
                  ? 'Individual Volunteer Profile Registered'
                  : 'NGO Coordinator & Roster Onboarded'}
              </CardTitle>
              <CardDescription className="text-slate-600 font-sans">
                Responder information has been captured in local prototype state.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              <div className="p-4 rounded-md border border-amber-200 bg-amber-50 text-amber-900 text-xs font-sans flex items-start gap-2">
                <Shield size={18} className="text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block">Prototype Activation Status:</strong>
                  Your responder profile is queued for account activation. You may now proceed directly to your assigned Volunteer Response Center dashboard.
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-lg flex flex-wrap gap-3 justify-between">
              <Button
                variant="outline"
                onClick={() => setSubmittedData(null)}
                className="gap-2 text-slate-700 border-slate-300"
              >
                <RefreshCw size={14} /> Register Another Profile
              </Button>

              <div className="flex items-center gap-2">
                {submittedData.role === 'ngo_coordinator' && (
                  <Button
                    variant="outline"
                    onClick={() => router.push('/volunteer/ngo')}
                    className="text-sky-800 border-sky-300 bg-sky-50 hover:bg-sky-100 font-sans"
                  >
                    Open NGO Management Layer →
                  </Button>
                )}
                <Button
                  onClick={() => router.push('/volunteer/home')}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white font-sans gap-2"
                >
                  <span>Proceed to Volunteer Response Center</span>
                  <ArrowRight size={16} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ) : (
          /* Authentication Flow Form Container */
          <div className="space-y-6">
            <RoleSelector selectedRole={selectedRole} onSelectRole={setSelectedRole} />

            {selectedRole === 'individual' ? (
              <IndividualVolunteerForm onSubmit={handleIndividualSubmit} isLoading={isLoading} />
            ) : (
              <NgoCoordinatorForm onSubmit={handleNgoSubmit} isLoading={isLoading} />
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
