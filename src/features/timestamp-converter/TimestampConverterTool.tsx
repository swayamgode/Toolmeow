'use client';

import React, { useState, useEffect } from 'react';
import { parseTimestampInput, dateToTimestamp } from '@/lib/tools/datetime';
import { CopyButton } from '@/components/feedback/CopyButton';
import { Clock, RefreshCw } from 'lucide-react';

export const TimestampConverterTool: React.FC = () => {
  const [currentEpoch, setCurrentEpoch] = useState<number>(1770000000);
  const [inputVal, setInputVal] = useState<string>('1770000000');

  // Date picker fields with deterministic defaults
  const [year, setYear] = useState<number>(2026);
  const [month, setMonth] = useState<number>(2);
  const [day, setDay] = useState<number>(1);
  const [hours, setHours] = useState<number>(12);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  // Live clock tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const parsedFromInput = parseTimestampInput(inputVal);
  const parsedFromCalendar = dateToTimestamp(year, month, day, hours, minutes, seconds);

  return (
    <div className="space-y-6">
      {/* Live Current Epoch Banner */}
      <div className="p-4 sm:p-5 rounded-2xl border border-[#E7E7E4] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EEF0FF] flex items-center justify-center text-[#4F46E5]">
            <Clock className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#5B5B66] uppercase tracking-wider block">
              Current Unix Epoch (Seconds)
            </span>
            <span className="text-xl sm:text-2xl font-mono font-bold text-[#0B0B0F]">
              {currentEpoch}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CopyButton textToCopy={String(currentEpoch)} label="Copy Epoch" />
          <button
            type="button"
            onClick={() => setInputVal(String(currentEpoch))}
            className="px-3 py-1.5 rounded-lg border border-[#E7E7E4] bg-white text-xs font-semibold text-[#5B5B66] hover:bg-[#F4F4F2] transition-colors cursor-pointer"
          >
            Use Current
          </button>
        </div>
      </div>

      {/* Epoch to Human Date */}
      <div className="p-5 rounded-2xl border border-[#E7E7E4] bg-white space-y-4">
        <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider block">
          Convert Timestamp to Human Date
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="e.g. 1700000000 or ISO date string"
            className="flex-1 p-3 rounded-xl border border-[#E7E7E4] bg-white text-sm font-mono text-[#0B0B0F] placeholder-[#5B5B66] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          />
          <button
            type="button"
            onClick={() => setInputVal(String(currentEpoch))}
            className="p-3 rounded-xl border border-[#E7E7E4] hover:bg-[#F4F4F2] text-[#5B5B66] transition-colors cursor-pointer"
            title="Reset to now"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {parsedFromInput ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-[#F4F4F2] rounded-xl border border-[#E7E7E4]">
              <span className="text-[11px] font-bold text-[#5B5B66] block">GMT / UTC (ISO 8601)</span>
              <span className="text-xs font-mono font-bold text-[#0B0B0F] break-all select-all">
                {parsedFromInput.isoUtc}
              </span>
            </div>
            <div className="p-3 bg-[#F4F4F2] rounded-xl border border-[#E7E7E4]">
              <span className="text-[11px] font-bold text-[#5B5B66] block">Your Local Time</span>
              <span className="text-xs font-mono font-bold text-[#0B0B0F] break-all select-all">
                {parsedFromInput.localFormatted}
              </span>
            </div>
            <div className="p-3 bg-[#F4F4F2] rounded-xl border border-[#E7E7E4]">
              <span className="text-[11px] font-bold text-[#5B5B66] block">Relative Time</span>
              <span className="text-xs font-semibold text-[#4F46E5] block">
                {parsedFromInput.relative}
              </span>
            </div>
            <div className="p-3 bg-[#F4F4F2] rounded-xl border border-[#E7E7E4]">
              <span className="text-[11px] font-bold text-[#5B5B66] block">Day & Offset</span>
              <span className="text-xs text-[#0B0B0F] block">
                {parsedFromInput.dayOfWeek} ({parsedFromInput.timezoneOffset})
              </span>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-medium">
            Invalid timestamp format. Enter integer seconds, milliseconds, or ISO date.
          </div>
        )}
      </div>

      {/* Human Date to Timestamp */}
      <div className="p-5 rounded-2xl border border-[#E7E7E4] bg-white space-y-4">
        <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider block">
          Convert Date to Timestamp
        </label>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          <div>
            <span className="text-[10px] text-[#5B5B66] font-semibold block mb-1">Year</span>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full p-2 rounded-lg border border-[#E7E7E4] text-xs font-mono text-[#0B0B0F]"
            />
          </div>
          <div>
            <span className="text-[10px] text-[#5B5B66] font-semibold block mb-1">Month</span>
            <input
              type="number"
              min={1}
              max={12}
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-full p-2 rounded-lg border border-[#E7E7E4] text-xs font-mono text-[#0B0B0F]"
            />
          </div>
          <div>
            <span className="text-[10px] text-[#5B5B66] font-semibold block mb-1">Day</span>
            <input
              type="number"
              min={1}
              max={31}
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className="w-full p-2 rounded-lg border border-[#E7E7E4] text-xs font-mono text-[#0B0B0F]"
            />
          </div>
          <div>
            <span className="text-[10px] text-[#5B5B66] font-semibold block mb-1">Hour</span>
            <input
              type="number"
              min={0}
              max={23}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full p-2 rounded-lg border border-[#E7E7E4] text-xs font-mono text-[#0B0B0F]"
            />
          </div>
          <div>
            <span className="text-[10px] text-[#5B5B66] font-semibold block mb-1">Min</span>
            <input
              type="number"
              min={0}
              max={59}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="w-full p-2 rounded-lg border border-[#E7E7E4] text-xs font-mono text-[#0B0B0F]"
            />
          </div>
          <div>
            <span className="text-[10px] text-[#5B5B66] font-semibold block mb-1">Sec</span>
            <input
              type="number"
              min={0}
              max={59}
              value={seconds}
              onChange={(e) => setSeconds(Number(e.target.value))}
              className="w-full p-2 rounded-lg border border-[#E7E7E4] text-xs font-mono text-[#0B0B0F]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3 bg-[#EEF0FF] rounded-xl border border-[#4F46E5]/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#4F46E5] block">Epoch (Seconds)</span>
              <span className="text-base font-mono font-bold text-[#0B0B0F]">
                {parsedFromCalendar.seconds}
              </span>
            </div>
            <CopyButton textToCopy={String(parsedFromCalendar.seconds)} label="Copy" />
          </div>
          <div className="p-3 bg-[#F4F4F2] rounded-xl border border-[#E7E7E4] flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#5B5B66] block">Epoch (Milliseconds)</span>
              <span className="text-base font-mono font-bold text-[#0B0B0F]">
                {parsedFromCalendar.milliseconds}
              </span>
            </div>
            <CopyButton textToCopy={String(parsedFromCalendar.milliseconds)} label="Copy" />
          </div>
        </div>
      </div>
    </div>
  );
};
