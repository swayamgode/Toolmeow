import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface ErrorAlertProps {
  message: string;
  className?: string;
  onDismiss?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, className = '', onDismiss }) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      className={`p-4 rounded-xl bg-[#FEF2F2] border border-[#F87171]/40 text-[#DC2626] text-xs sm:text-sm flex items-start gap-3 ${className}`}
    >
      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#DC2626]" />
      <div className="flex-1 font-medium">{message}</div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-xs text-[#DC2626] font-semibold hover:underline"
        >
          Dismiss
        </button>
      )}
    </div>
  );
};

