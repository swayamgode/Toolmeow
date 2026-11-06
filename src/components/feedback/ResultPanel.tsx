import React from 'react';
import { CopyButton } from './CopyButton';

export interface ResultPanelProps {
  label: string;
  value: string | number;
  secondaryInfo?: string;
  copyable?: boolean;
  className?: string;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({
  label,
  value,
  secondaryInfo,
  copyable = true,
  className = '',
}) => {
  return (
    <div
      className={`p-5 rounded-2xl bg-[#F4F4F2] border border-[#E7E7E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden ${className}`}
      aria-live="polite"
    >
      <div className="min-w-0 flex-1">
        <span className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider block mb-1">
          {label}
        </span>
        <div className="text-2xl sm:text-3xl font-extrabold text-[#0B0B0F] tabular-nums tracking-tight break-all">
          {value}
        </div>
        {secondaryInfo && (
          <p className="text-xs text-[#5B5B66] mt-1 break-all">{secondaryInfo}</p>
        )}
      </div>

      {copyable && typeof value === 'string' && (
        <div className="shrink-0 self-start sm:self-center">
          <CopyButton textToCopy={value} />
        </div>
      )}
    </div>
  );
};

