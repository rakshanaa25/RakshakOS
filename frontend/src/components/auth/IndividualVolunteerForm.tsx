import React, { useState } from 'react';
import { IndividualVolunteerRegistration, AuthValidationErrors, AvailabilityStatus, SexCategory } from '@/lib/types/auth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Info, CheckCircle2 } from 'lucide-react';
import { CvUpload } from '@/components/auth/CvUpload';

interface IndividualVolunteerFormProps {
  onSubmit: (formData: IndividualVolunteerRegistration, cvDetails?: { name: string; size: number } | null) => void;
  isLoading: boolean;
}

const AVAILABLE_SKILLS = [
  'First Aid / Paramedic',
  'Search & Rescue',
  'Boat Operations',
  'Shelter Management',
  'Debris & Road Clearance',
  'Radio Communications',
  'Logistics & Supply Chain',
  'Firefighting & Hazard Control',
];

export const IndividualVolunteerForm: React.FC<IndividualVolunteerFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [sex, setSex] = useState<SexCategory | ''>('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [regionLocation, setRegionLocation] = useState('');
  const [skills, setSkills] = useState<string[]>(['First Aid / Paramedic']);
  const [availability, setAvailability] = useState<AvailabilityStatus>('Available');
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [cvFileSize, setCvFileSize] = useState<number | null>(null);

  const [errors, setErrors] = useState<AuthValidationErrors>({});

  const validate = (): boolean => {
    const newErrors: AuthValidationErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (age === '' || isNaN(Number(age))) {
      newErrors.age = 'Valid age is required.';
    } else if (Number(age) < 18 || Number(age) > 99) {
      newErrors.age = 'Age must be between 18 and 99.';
    }

    if (!sex) {
      newErrors.sex = 'Please select sex.';
    }

    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile / Contact number is required.';
    } else if (mobileNumber.trim().length < 8) {
      newErrors.mobileNumber = 'Contact number must be at least 8 digits.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!regionLocation.trim()) {
      newErrors.regionLocation = 'Region / Location is required.';
    }

    if (skills.length === 0) {
      newErrors.skills = 'Select at least one skill.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleToggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const registrationData: IndividualVolunteerRegistration = {
      fullName: fullName.trim(),
      age: Number(age),
      sex: sex as SexCategory,
      mobileNumber: mobileNumber.trim(),
      email: email.trim(),
      regionLocation: regionLocation.trim(),
      skills,
      availability,
    };

    const cvDetails = cvFileName && cvFileSize ? { name: cvFileName, size: cvFileSize } : null;
    onSubmit(registrationData, cvDetails);
  };

  return (
    <Card className="border-slate-200 bg-white shadow-xs font-sans text-xs">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-6 space-y-1 rounded-t-lg">
        <div className="flex items-center justify-between">
          <Badge variant="success" className="font-sans">
            Individual Field Responder
          </Badge>
          <span className="text-xs text-slate-500 font-sans">Registration Form</span>
        </div>
        <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <User size={18} className="text-slate-800" />
          Individual Volunteer Profile Registration
        </CardTitle>
        <CardDescription className="text-slate-600 font-sans">
          Provide responder identity, location, skills, and operational availability status.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="p-6 space-y-6">
          {/* Identity Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-slate-700 uppercase text-[10px] font-bold tracking-wider">
                Full Name *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Vikram Malhotra"
                className={`w-full bg-white border rounded-md p-2.5 text-slate-900 focus:outline-none transition-colors ${
                  errors.fullName ? 'border-rose-500' : 'border-slate-300 focus:border-slate-800'
                }`}
              />
              {errors.fullName && <p className="text-[11px] text-rose-600 font-sans">{errors.fullName}</p>}
            </div>

            {/* Age */}
            <div className="space-y-1.5">
              <label className="text-slate-700 uppercase text-[10px] font-bold tracking-wider">
                Age *
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="e.g. 26"
                className={`w-full bg-white border rounded-md p-2.5 text-slate-900 focus:outline-none transition-colors ${
                  errors.age ? 'border-rose-500' : 'border-slate-300 focus:border-slate-800'
                }`}
              />
              {errors.age && <p className="text-[11px] text-rose-600 font-sans">{errors.age}</p>}
            </div>

            {/* Sex */}
            <div className="space-y-1.5">
              <label className="text-slate-700 uppercase text-[10px] font-bold tracking-wider">
                Sex *
              </label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value as SexCategory)}
                className={`w-full bg-white border rounded-md p-2.5 text-slate-900 focus:outline-none transition-colors ${
                  errors.sex ? 'border-rose-500' : 'border-slate-300 focus:border-slate-800'
                }`}
              >
                <option value="">Select Sex...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.sex && <p className="text-[11px] text-rose-600 font-sans">{errors.sex}</p>}
            </div>

            {/* Mobile / Contact */}
            <div className="space-y-1.5">
              <label className="text-slate-700 uppercase text-[10px] font-bold tracking-wider">
                Mobile / Contact Number *
              </label>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="+91 9876543210"
                className={`w-full bg-white border rounded-md p-2.5 text-slate-900 focus:outline-none transition-colors font-mono text-xs ${
                  errors.mobileNumber ? 'border-rose-500' : 'border-slate-300 focus:border-slate-800'
                }`}
              />
              {errors.mobileNumber && <p className="text-[11px] text-rose-600 font-sans">{errors.mobileNumber}</p>}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-slate-700 uppercase text-[10px] font-bold tracking-wider">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vikram@responder.org"
                className={`w-full bg-white border rounded-md p-2.5 text-slate-900 focus:outline-none transition-colors font-mono text-xs ${
                  errors.email ? 'border-rose-500' : 'border-slate-300 focus:border-slate-800'
                }`}
              />
              {errors.email && <p className="text-[11px] text-rose-600 font-sans">{errors.email}</p>}
            </div>
          </div>

          {/* Contact Verification Notice */}
          <div className="p-3 rounded-md border border-slate-200 bg-slate-50 text-[11px] text-slate-600 font-sans flex items-center gap-2">
            <Info size={16} className="text-slate-700 shrink-0" />
            <span>
              <strong>Account Activation Note:</strong> Mobile and email verification will be completed during account activation when backend services are active.
            </span>
          </div>

          {/* Region / Location */}
          <div className="space-y-1.5">
            <label className="text-slate-700 uppercase text-[10px] font-bold tracking-wider">
              Assigned Region / Field Operating Location *
            </label>
            <input
              type="text"
              value={regionLocation}
              onChange={(e) => setRegionLocation(e.target.value)}
              placeholder="e.g. Sector 4, Flood Relief Command Zone"
              className={`w-full bg-white border rounded-md p-2.5 text-slate-900 focus:outline-none transition-colors ${
                errors.regionLocation ? 'border-rose-500' : 'border-slate-300 focus:border-slate-800'
              }`}
            />
            {errors.regionLocation && <p className="text-[11px] text-rose-600 font-sans">{errors.regionLocation}</p>}
          </div>

          {/* Skills Multi-select Checkbox Grid */}
          <div className="space-y-2">
            <label className="text-slate-700 uppercase text-[10px] font-bold tracking-wider block">
              Operational Skills & Expertise *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {AVAILABLE_SKILLS.map((skill) => {
                const isSelected = skills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleToggleSkill(skill)}
                    className={`p-2.5 rounded-md border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs truncate">{skill}</span>
                    {isSelected && <CheckCircle2 size={14} className="text-emerald-700 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
            {errors.skills && <p className="text-[11px] text-rose-600 font-sans">{errors.skills}</p>}
          </div>

          {/* Availability Status Toggle */}
          <div className="space-y-2">
            <label className="text-slate-700 uppercase text-[10px] font-bold tracking-wider block">
              Initial Operational Availability Status *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Available', 'Busy', 'Unavailable'] as AvailabilityStatus[]).map((status) => {
                const isSelected = availability === status;
                const colors = {
                  Available: isSelected
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50',
                  Busy: isSelected
                    ? 'bg-amber-100 border-amber-500 text-amber-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50',
                  Unavailable: isSelected
                    ? 'bg-rose-100 border-rose-500 text-rose-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50',
                };
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setAvailability(status)}
                    className={`py-2.5 px-3 rounded-md border text-center font-sans font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer ${colors[status]}`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Individual CV Upload */}
          <div className="pt-2 border-t border-slate-200">
            <CvUpload
              label="Individual Qualification / CV Upload (Optional)"
              selectedFileName={cvFileName}
              selectedFileSize={cvFileSize}
              onFileSelect={(fName, fSize) => {
                setCvFileName(fName);
                setCvFileSize(fSize);
              }}
              onFileRemove={() => {
                setCvFileName(null);
                setCvFileSize(null);
              }}
              helperText="Attach your CV or paramedic certification document for organizational capability records."
            />
          </div>
        </CardContent>

        <CardFooter className="p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-500 font-sans">
            Registers profile into RakshakOS responder directory.
          </span>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-600 text-white font-sans text-xs uppercase tracking-wider px-6"
          >
            {isLoading ? 'Validating & Submitting...' : 'Complete Individual Registration →'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
