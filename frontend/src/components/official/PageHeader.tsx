import React from 'react';
import { Badge } from '@/components/ui/badge';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { Shield, Clock, MapPin } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  scenarioName: string;
  regionLocation: string;
  operationStatus: string;
  lastUpdated: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  scenarioName,
  regionLocation,
  operationStatus,
  lastUpdated,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
          <Badge variant="outline" className="bg-white border-slate-300 text-slate-800 font-semibold">
            <Shield className="w-3 h-3 mr-1 text-slate-700 inline" />
            {scenarioName}
          </Badge>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600 font-medium flex items-center gap-1">
            <MapPin size={12} className="text-slate-500" />
            {regionLocation}
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
          {title}
        </h1>
        <p className="text-xs md:text-sm text-slate-600 font-sans">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3 self-start md:self-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 p-2.5 rounded-md border border-slate-200 bg-white shadow-2xs text-xs">
          <StatusIndicator status="active" label={operationStatus} />
          <span className="hidden md:inline text-slate-300">|</span>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
            <Clock size={12} />
            <span>Updated: {lastUpdated}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
