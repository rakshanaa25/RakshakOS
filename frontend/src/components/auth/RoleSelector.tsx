import React from 'react';
import { User, Building2, CheckCircle2 } from 'lucide-react';
import { VolunteerRoleType } from '@/lib/types/auth';

interface RoleSelectorProps {
  selectedRole: VolunteerRoleType;
  onSelectRole: (role: VolunteerRoleType) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  selectedRole,
  onSelectRole,
}) => {
  return (
    <div className="space-y-3 font-sans">
      <div className="text-center space-y-1">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Select Volunteer Registration Type
        </h2>
        <p className="text-xs text-slate-600 font-sans">
          Choose whether you are registering as an individual field responder or an NGO team coordinator.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Individual Volunteer Card */}
        <button
          type="button"
          onClick={() => onSelectRole('individual')}
          className={`p-5 rounded-lg border text-left transition-all cursor-pointer ${
            selectedRole === 'individual'
              ? 'bg-emerald-50/60 border-emerald-500 ring-1 ring-emerald-500/20 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className={`p-2.5 rounded-md ${selectedRole === 'individual' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
              <User size={20} />
            </div>
            {selectedRole === 'individual' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-sans text-xs font-semibold">
                <CheckCircle2 size={12} />
                Selected
              </span>
            )}
          </div>
          <div className="mt-3 space-y-1">
            <h3 className="font-sans text-sm font-bold text-slate-900">
              Individual Volunteer
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Register as an independent field responder. Provide personal details, skills, region, and operational availability.
            </p>
          </div>
        </button>

        {/* NGO Coordinator Card */}
        <button
          type="button"
          onClick={() => onSelectRole('ngo_coordinator')}
          className={`p-5 rounded-lg border text-left transition-all cursor-pointer ${
            selectedRole === 'ngo_coordinator'
              ? 'bg-sky-50/60 border-sky-500 ring-1 ring-sky-500/20 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className={`p-2.5 rounded-md ${selectedRole === 'ngo_coordinator' ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
              <Building2 size={20} />
            </div>
            {selectedRole === 'ngo_coordinator' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-sans text-xs font-semibold">
                <CheckCircle2 size={12} />
                Selected
              </span>
            )}
          </div>
          <div className="mt-3 space-y-1">
            <h3 className="font-sans text-sm font-bold text-slate-900">
              NGO Coordinator
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Register an organization & manage team members via manual field entry or bulk Excel spreadsheet upload.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
