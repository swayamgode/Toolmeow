'use client';

import React, { useState } from 'react';
import { calculateAge, type AgeResult } from '@/lib/tools/age';
import { ErrorAlert } from '@/components/feedback/ErrorAlert';
import { Calendar, PartyPopper } from 'lucide-react';

export const AgeCalculatorTool: React.FC = () => {
  const todayStr = '2026-11-01'; // Default stable date matching runtime environment
  const [dob, setDob] = useState<string>('2000-01-15');
  const [asOfDate, setAsOfDate] = useState<string>(todayStr);
  const [error, setError] = useState<string | null>(null);

  let result: AgeResult | null = null;
  try {
    if (dob) {
      result = calculateAge(dob, asOfDate || undefined);
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (error !== err.message) setError(err.message);
    }
  }

  return (
    <div className="space-y-6">
      {/* Date Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
            Date of Birth
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
              setError(null);
            }}
            max={asOfDate}
            className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-sm font-semibold text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
            Calculate Age As Of
          </label>
          <input
            type="date"
            value={asOfDate}
            onChange={(e) => {
              setAsOfDate(e.target.value);
              setError(null);
            }}
            className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-sm font-semibold text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          />
        </div>
      </div>

      {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}

      {result && (
        <div className="space-y-6">
          {/* Primary Age Display */}
          <div className="p-6 rounded-2xl bg-[#EEF0FF] border border-[#4F46E5]/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#4F46E5] uppercase tracking-wider block mb-1">
                Your Exact Chronological Age
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0B0B0F] tracking-tight">
                {result.years} <span className="text-lg font-normal text-[#5B5B66]">years,</span>{' '}
                {result.months} <span className="text-lg font-normal text-[#5B5B66]">months,</span>{' '}
                {result.days} <span className="text-lg font-normal text-[#5B5B66]">days</span>
              </div>
              <p className="text-xs text-[#5B5B66] mt-2 flex items-center gap-1.5 justify-center sm:justify-start">
                <Calendar className="w-3.5 h-3.5 text-[#4F46E5]" />
                <span>Born on a {result.dayOfWeek}</span>
                {result.leapNote && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-[#FEF3C7] text-[#D97706] font-semibold text-[10px]">
                    {result.leapNote}
                  </span>
                )}
              </p>
            </div>

            {/* Next Birthday Countdown */}
            <div className="bg-white p-4 rounded-xl border border-[#E7E7E4] text-center shrink-0 w-full sm:w-auto shadow-sm">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#16A34A] mb-1">
                <PartyPopper className="w-4 h-4" />
                <span>Next Birthday</span>
              </div>
              <div className="text-2xl font-black text-[#0B0B0F] tabular-nums">
                {result.nextBirthdayDays} <span className="text-xs font-normal text-[#5B5B66]">days</span>
              </div>
              <span className="text-[10px] text-[#5B5B66]">{result.nextBirthdayDate}</span>
            </div>
          </div>

          {/* Statistical Breakdown Grid */}
          <div>
            <h4 className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-3">
              Total Cumulative Lifespan Breakdown
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#FAFAF9] border border-[#E7E7E4]">
                <span className="text-[11px] text-[#5B5B66] block">Total Months</span>
                <span className="text-lg font-bold text-[#0B0B0F] tabular-nums">
                  {result.totalMonths.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAFAF9] border border-[#E7E7E4]">
                <span className="text-[11px] text-[#5B5B66] block">Total Weeks</span>
                <span className="text-lg font-bold text-[#0B0B0F] tabular-nums">
                  {result.totalWeeks.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAFAF9] border border-[#E7E7E4]">
                <span className="text-[11px] text-[#5B5B66] block">Total Days</span>
                <span className="text-lg font-bold text-[#0B0B0F] tabular-nums">
                  {result.totalDays.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAFAF9] border border-[#E7E7E4]">
                <span className="text-[11px] text-[#5B5B66] block">Total Hours</span>
                <span className="text-lg font-bold text-[#0B0B0F] tabular-nums">
                  {result.totalHours.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

