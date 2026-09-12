import React, { useState } from 'react';
import { NgoCoordinatorRegistration, NgoTeamMember, AuthValidationErrors } from '@/lib/types/auth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, UserCheck, FileSpreadsheet, UserPlus, CheckCircle2 } from 'lucide-react';
import { CvUpload } from '@/components/auth/CvUpload';
import { ExcelUpload } from '@/components/auth/ExcelUpload';
import { TeamMemberManualForm } from '@/components/auth/TeamMemberManualForm';
import { TeamMemberList } from '@/components/auth/TeamMemberList';

interface NgoCoordinatorFormProps {
  onSubmit: (formData: NgoCoordinatorRegistration) => void;
  isLoading: boolean;
}

export const NgoCoordinatorForm: React.FC<NgoCoordinatorFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  // Leader & NGO State
  const [coordinatorName, setCoordinatorName] = useState('');
  const [coordinatorMobile, setCoordinatorMobile] = useState('');
  const [coordinatorEmail, setCoordinatorEmail] = useState('');
  const [regionLocation, setRegionLocation] = useState('');
  const [ngoName, setNgoName] = useState('');
  const [organizationDetails, setOrganizationDetails] = useState('');

  // Leader CV state
  const [leaderCvFileName, setLeaderCvFileName] = useState<string | null>(null);
  const [leaderCvFileSize, setLeaderCvFileSize] = useState<number | null>(null);

  // Team Registration Mode & Data
  const [registrationMethod, setRegistrationMethod] = useState<'manual' | 'excel' | 'hybrid'>('manual');
  const [teamMembers, setTeamMembers] = useState<NgoTeamMember[]>([]);
  const [excelFileName, setExcelFileName] = useState<string | null>(null);
  const [excelFileSize, setExcelFileSize] = useState<number | null>(null);

  const [errors, setErrors] = useState<AuthValidationErrors>({});

  const handleAddManualMember = (newMember: NgoTeamMember) => {
    setTeamMembers((prev) => [...prev, newMember]);
  };

  const handleRemoveManualMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const validate = (): boolean => {
    const newErrors: AuthValidationErrors = {};

    if (!coordinatorName.trim()) {
      newErrors.coordinatorName = 'Leader Full Name is required.';
    }

    if (!coordinatorMobile.trim()) {
      newErrors.coordinatorMobile = 'Leader contact number is required.';
    } else if (coordinatorMobile.trim().length < 8) {
      newErrors.coordinatorMobile = 'Contact number must be at least 8 digits.';
    }

    if (!coordinatorEmail.trim()) {
      newErrors.coordinatorEmail = 'Leader email is required.';
    } else if (!coordinatorEmail.includes('@') || !coordinatorEmail.includes('.')) {
      newErrors.coordinatorEmail = 'Please enter a valid email address.';
    }

    if (!regionLocation.trim()) {
      newErrors.regionLocation = 'Region / Location is required.';
    }

    if (!ngoName.trim()) {
      newErrors.ngoName = 'NGO Name is required.';
    }

    // Check team registration method validation
    if (teamMembers.length === 0 && !excelFileName) {
      newErrors.teamMembers = 'Please add team members manually or select an Excel file for bulk upload.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    let computedMethod: 'manual' | 'excel' | 'hybrid' = registrationMethod;
    if (teamMembers.length > 0 && excelFileName) {
      computedMethod = 'hybrid';
    } else if (excelFileName) {
      computedMethod = 'excel';
    } else {
      computedMethod = 'manual';
    }

    const registrationPayload: NgoCoordinatorRegistration = {
      coordinatorFullName: coordinatorName.trim(),
      coordinatorMobile: coordinatorMobile.trim(),
      coordinatorEmail: coordinatorEmail.trim(),
      regionLocation: regionLocation.trim(),
      ngoName: ngoName.trim(),
      organizationDetails: organizationDetails.trim(),
      coordinatorCvFileName: leaderCvFileName,
      registrationMethod: computedMethod,
      teamMembers: teamMembers,
      excelFileName: excelFileName,
      excelFileSize: excelFileSize,
    };

    onSubmit(registrationPayload);
  };

  return (
    <Card className="border-slate-200 bg-white shadow-xs font-sans text-xs">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-6 space-y-1 rounded-t-lg">
        <div className="flex items-center justify-between">
          <Badge variant="info" className="font-sans">
            NGO Coordinator Scope
          </Badge>
          <span className="text-xs text-slate-500 font-sans">Bulk Team Registration Ready</span>
        </div>
        <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Building2 size={18} className="text-sky-700" />
          NGO Coordinator & Organization Registration
        </CardTitle>
        <CardDescription className="text-slate-600 font-sans">
          Register your organization coordinator profile and onboard team members manually or via Excel bulk upload.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="p-6 space-y-8">
          {/* SECTION 1: LEADER & NGO IDENTITY */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 text-xs">
                <UserCheck size={16} className="text-sky-700" />
                1. NGO Coordinator Leader Details
              </span>
              <span className="text-[11px] text-slate-500 font-sans">Leader Information (Not in Excel)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Leader Full Name */}
              <div className="space-y-1.5">
                <label className="text-slate-700 uppercase text-[10px] font-bold tracking-wider">
                  Coordinator Full Name *
                </label>
                <input
                  type="text"
                  value={coordinatorName}
                  onChange={(e) => setCoordinatorName(e.target.value)}
                  placeholder="e.g. Anil Kumar (NGO Leader)"
                  className={`w-full bg-white border rounded-md p-2.5 text-slate-900 focus:outline-none transition-colors ${
                    errors.coordinatorName ? 'border-rose-500' : 'border-slate-300 focus:border-slate-800'
                  }`}
                />
                {errors.coordinatorName && <p className="text-[11px] text-rose-600 font-sans">{errors.coordinatorName}</p>}
              </div>

              {/* NGO Name - Manually Typed */}
              <div className="space-y-1.5">
                <label className="text-slate-700 uppercase text-[10px] font-bold tracking-wider">
                  NGO Name (Manually Typed) *
                </label>
                <input
                  type="text"
                  value={ngoName}
                  onChange={(e) => setNgoName(e.target.value)}
                  placeholder="e.g. Disaster Relief Action NGO"
                  className={`w-full bg-white border rounded-md p-2.5 text-slate-900 focus:outline-none transition-colors ${
                    errors.ngoName ? 'border-rose-500' : 'border-slate-300 focus:border-slate-800'
                  }`}
                />
                {errors.ngoName && <p className="text-[11px] text-rose-600 font-sans">{errors.ngoName}</p>}
              </div>

              {/* Mobile / Contact */}
              <div className="space-y-1.5">
                <label className="text-slate-700 uppercase text-[10px] font-bold tracking-wider">
                  Leader Contact / Mobile *
                </label>
                <input
                  type="text"
                  value={coordinatorMobile}
                  onChange={(e) => setCoordinatorMobile(e.target.value)}
                  placeholder="+91 9988776655"
                  className={`w-full bg-white border rounded-md p-2.5 text-slate-900 focus:outline-none transition-colors font-mono text-xs ${
                    errors.coordinatorMobile ? 'border-rose-500' : 'border-slate-300 focus:border-slate-800'
                  }`}
                />
                {errors.coordinatorMobile && <p className="text-[11px] text-rose-600 font-sans">{errors.coordinatorMobile}</p>}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-slate-700 uppercase text-[10px] font-bold tracking-wider">
                  Leader Email *
                </label>
                <input
                  type="email"
                  value={coordinatorEmail}
                  onChange={(e) => setCoordinatorEmail(e.target.value)}
                  placeholder="coordinator@disasterrelief.org"
                  className={`w-full bg-white border rounded-md p-2.5 text-slate-900 focus:outline-none transition-colors font-mono text-xs ${
                    errors.coordinatorEmail ? 'border-rose-500' : 'border-slate-300 focus:border-slate-800'
                  }`}
                />
                {errors.coordinatorEmail && <p className="text-[11px] text-rose-600 font-sans">{errors.coordinatorEmail}</p>}
              </div>

              {/* Region / Location */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-slate-700 uppercase text-[10px] font-bold tracking-wider">
                  NGO Operating Headquarters / Region *
                </label>
                <input
                  type="text"
                  value={regionLocation}
                  onChange={(e) => setRegionLocation(e.target.value)}
                  placeholder="e.g. North Zone Command HQ, District 2"
                  className={`w-full bg-white border rounded-md p-2.5 text-slate-900 focus:outline-none transition-colors ${
                    errors.regionLocation ? 'border-rose-500' : 'border-slate-300 focus:border-slate-800'
                  }`}
                />
                {errors.regionLocation && <p className="text-[11px] text-rose-600 font-sans">{errors.regionLocation}</p>}
              </div>
            </div>

            {/* Optional Leader CV Upload */}
            <div className="pt-2">
              <CvUpload
                label="Leader CV / Organizational Charter (Optional)"
                selectedFileName={leaderCvFileName}
                selectedFileSize={leaderCvFileSize}
                onFileSelect={(fName, fSize) => {
                  setLeaderCvFileName(fName);
                  setLeaderCvFileSize(fSize);
                }}
                onFileRemove={() => {
                  setLeaderCvFileName(null);
                  setLeaderCvFileSize(null);
                }}
                helperText="Upload coordinator credential or NGO registration charter document."
              />
            </div>
          </div>

          {/* SECTION 2: TEAM MEMBER REGISTRATION */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 text-xs">
                <Building2 size={16} className="text-sky-700" />
                2. Register Organization Team Members
              </span>
              <span className="text-[11px] text-slate-500 font-sans">Team Roster Onboarding</span>
            </div>

            {errors.teamMembers && (
              <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs font-sans">
                ⚠️ {errors.teamMembers}
              </div>
            )}

            {/* Registration Method Switcher */}
            <div className="flex border-b border-slate-200 font-sans">
              <button
                type="button"
                onClick={() => setRegistrationMethod('manual')}
                className={`flex items-center gap-2 px-4 py-2 font-sans text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors cursor-pointer ${
                  registrationMethod === 'manual'
                    ? 'border-sky-700 text-sky-800 bg-sky-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserPlus size={14} />
                Method A: Manual Team Member Entry ({teamMembers.length})
              </button>

              <button
                type="button"
                onClick={() => setRegistrationMethod('excel')}
                className={`flex items-center gap-2 px-4 py-2 font-sans text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors cursor-pointer ${
                  registrationMethod === 'excel'
                    ? 'border-sky-700 text-sky-800 bg-sky-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileSpreadsheet size={14} />
                Method B: Excel Bulk Upload {excelFileName && '✓'}
              </button>
            </div>

            {/* Method A UI */}
            {registrationMethod === 'manual' && (
              <div className="space-y-6 pt-2">
                <TeamMemberManualForm onAddMember={handleAddManualMember} />
                <TeamMemberList members={teamMembers} onRemoveMember={handleRemoveManualMember} />
              </div>
            )}

            {/* Method B UI */}
            {registrationMethod === 'excel' && (
              <div className="space-y-4 pt-2">
                <ExcelUpload
                  selectedFileName={excelFileName}
                  selectedFileSize={excelFileSize}
                  onFileSelect={(fName, fSize) => {
                    setExcelFileName(fName);
                    setExcelFileSize(fSize);
                  }}
                  onFileRemove={() => {
                    setExcelFileName(null);
                    setExcelFileSize(null);
                  }}
                />
              </div>
            )}

            {/* Summary indication when switching */}
            <div className="p-3 rounded-md border border-slate-200 bg-slate-50 text-slate-700 font-sans text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span>
                  Team Member Roster Summary: <strong className="text-slate-900">{teamMembers.length} manual members</strong> + <strong className="text-slate-900">{excelFileName ? '1 Excel File Upload' : 'No Excel File'}</strong>
                </span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-500 font-sans">
            Associates team roster with {ngoName || 'NGO Organization'}.
          </span>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto bg-sky-700 hover:bg-sky-600 text-white font-sans text-xs uppercase tracking-wider px-6"
          >
            {isLoading ? 'Validating & Submitting NGO Data...' : 'Complete NGO Registration →'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
