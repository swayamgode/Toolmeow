'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Check, Copy } from 'lucide-react';

export const MiniToolPreview: React.FC = () => {
  const [percent, setPercent] = useState<number>(15);
  const [amount, setAmount] = useState<number>(200);
  const [copied, setCopied] = useState(false);

  const result = (percent / 100) * amount;

  const handleCopy = () => {
    navigator.clipboard.writeText(result.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white/95 backdrop-blur-md rounded-[24px] border border-white/80 shadow-2xl p-5 sm:p-6 text-[#0B0B0F] text-left">
      {/* Window Chrome Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E7E7E4] mb-5">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#EF4444] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#F59E0B] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#10B981] inline-block" />
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5B5B66] bg-[#F4F4F2] px-3 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-[#4F46E5]" />
          <span>Live Interactive Preview &bull; Percentage Engine</span>
        </div>
        <div className="w-12" />
      </div>

      {/* Mini Tool Inputs */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
              What is (%)
            </label>
            <div className="relative">
              <input
                type="number"
                value={percent}
                onChange={(e) => setPercent(parseFloat(e.target.value) || 0)}
                className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-base font-semibold text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] tabular-nums"
                min="0"
                step="any"
              />
              <span className="absolute right-3.5 top-2.5 text-sm font-bold text-[#5B5B66] pointer-events-none">
                %
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
              Of Base Amount
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-base font-semibold text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] tabular-nums"
                min="0"
                step="any"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Calculation Result */}
        <div className="p-4 rounded-xl bg-[#EEF0FF] border border-[#4F46E5]/20 flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-[#4F46E5] uppercase tracking-wider block">
              Calculated Result
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0B0B0F] tabular-nums">
              {Number.isFinite(result) ? result.toLocaleString('en-IN') : '0'}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E7E7E4] text-xs font-semibold text-[#0B0B0F] hover:bg-[#F4F4F2] transition-colors shadow-sm cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                <span className="text-[#16A34A]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Link to Full Tool */}
        <div className="flex items-center justify-between pt-2 text-xs">
          <span className="text-[#5B5B66]">Runs 100% in your browser</span>
          <Link
            href="/tools/percentage-calculator"
            className="inline-flex items-center gap-1 font-semibold text-[#4F46E5] hover:underline"
          >
            <span>Open full calculator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

