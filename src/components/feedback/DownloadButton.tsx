import React from 'react';
import { Download } from 'lucide-react';

export interface DownloadButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  className?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  label = 'Download',
  className = '',
  ...props
}) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0B0B0F] text-white text-xs sm:text-sm font-semibold shadow-btn hover:bg-[#1E1E24] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...props}
    >
      <Download className="w-4 h-4 shrink-0" />
      <span>{label}</span>
    </button>
  );
};

