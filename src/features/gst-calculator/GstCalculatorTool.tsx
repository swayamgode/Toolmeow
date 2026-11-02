'use client';

import React, { useState } from 'react';
import { calculateGST } from '@/lib/tools/gst';
import { formatCurrencyIN } from '@/lib/format';
import { ResultPanel } from '@/components/feedback/ResultPanel';

const GST_RATES = [0, 0.25, 3, 5, 12, 18, 28];

export const GstCalculatorTool: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [rate, setRate] = useState<number>(18);
  const [customRate, setCustomRate] = useState<string>('');
  const [isInclusive, setIsInclusive] = useState<boolean>(false);
  const [isInterState, setIsInterState] = useState<boolean>(false);

  const activeRate = customRate !== '' ? parseFloat(customRate) || 0 : rate;

  const result = calculateGST({
    amount,
    rate: activeRate,
    isInclusive,
    isInterState,
  });

  return (
    <div className="space-y-6">
      {/* Mode Toggle: Exclusive vs Inclusive */}
      <div>
        <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-2">
          GST Calculation Mode
        </label>
        <div className="grid grid-cols-2 gap-2 max-w-md">
          <button
            type="button"
            onClick={() => setIsInclusive(false)}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              !isInclusive
                ? 'bg-[#0B0B0F] text-white border-[#0B0B0F] shadow-sm'
                : 'bg-white text-[#5B5B66] border-[#E7E7E4] hover:bg-[#F4F4F2]'
            }`}
          >
            GST Exclusive (Add GST)
          </button>
          <button
            type="button"
            onClick={() => setIsInclusive(true)}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isInclusive
                ? 'bg-[#0B0B0F] text-white border-[#0B0B0F] shadow-sm'
                : 'bg-white text-[#5B5B66] border-[#E7E7E4] hover:bg-[#F4F4F2]'
            }`}
          >
            GST Inclusive (Remove GST)
          </button>
        </div>
      </div>

      {/* Amount Input */}
      <div>
        <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
          {isInclusive ? 'Total Gross Amount (₹)' : 'Net Base Amount (₹)'}
        </label>
        <div className="relative max-w-md">
          <span className="absolute left-3.5 top-2.5 text-base font-bold text-[#5B5B66]">₹</span>
          <input
            type="number"
            value={isNaN(amount) ? '' : amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="w-full h-11 pl-8 pr-3.5 rounded-xl border border-[#E7E7E4] bg-white text-base font-semibold text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] tabular-nums"
            min="0"
            step="any"
          />
        </div>
      </div>

      {/* GST Rate Chips */}
      <div>
        <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-2">
          Applicable GST Rate (%)
        </label>
        <div className="flex flex-wrap gap-2 items-center">
          {GST_RATES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setRate(r);
                setCustomRate('');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                rate === r && customRate === ''
                  ? 'bg-[#4F46E5] text-white border-[#4F46E5]'
                  : 'bg-white text-[#5B5B66] border-[#E7E7E4] hover:bg-[#F4F4F2]'
              }`}
            >
              {r}%
            </button>
          ))}
          <div className="relative w-28">
            <input
              type="number"
              placeholder="Custom %"
              value={customRate}
              onChange={(e) => {
                setCustomRate(e.target.value);
              }}
              className="w-full h-8 px-2.5 rounded-lg border border-[#E7E7E4] bg-white text-xs font-medium text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            />
          </div>
        </div>
      </div>

      {/* Tax Supply Toggle: Intra vs Inter */}
      <div className="flex items-center gap-3 pt-1">
        <label className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B0B0F] cursor-pointer">
          <input
            type="checkbox"
            checked={isInterState}
            onChange={(e) => setIsInterState(e.target.checked)}
            className="w-4 h-4 rounded text-[#4F46E5] focus:ring-[#4F46E5]"
          />
          <span>Inter-State Transaction (IGST instead of CGST + SGST)</span>
        </label>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <ResultPanel
          label="Base Net Amount"
          value={formatCurrencyIN(result.baseAmount)}
          copyable={false}
        />
        <ResultPanel
          label="Total GST Amount"
          value={formatCurrencyIN(result.gstAmount)}
          copyable={false}
        />
        <ResultPanel
          label="Total Invoice Amount"
          value={formatCurrencyIN(result.totalAmount)}
          className="border-[#4F46E5]/40 bg-[#EEF0FF]"
        />
      </div>

      {/* Tax Component Breakdown */}
      <div className="p-4 rounded-xl bg-white border border-[#E7E7E4] text-xs space-y-2">
        <h4 className="font-bold text-[#0B0B0F] uppercase tracking-wider text-[11px]">
          Tax Component Breakdown
        </h4>
        {isInterState ? (
          <div className="flex justify-between py-1 border-b border-[#F4F4F2]">
            <span className="text-[#5B5B66]">Integrated GST (IGST @ {activeRate}%)</span>
            <span className="font-semibold text-[#0B0B0F] tabular-nums">
              {formatCurrencyIN(result.igst)}
            </span>
          </div>
        ) : (
          <>
            <div className="flex justify-between py-1 border-b border-[#F4F4F2]">
              <span className="text-[#5B5B66]">Central GST (CGST @ {activeRate / 2}%)</span>
              <span className="font-semibold text-[#0B0B0F] tabular-nums">
                {formatCurrencyIN(result.cgst)}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F4F4F2]">
              <span className="text-[#5B5B66]">State GST (SGST @ {activeRate / 2}%)</span>
              <span className="font-semibold text-[#0B0B0F] tabular-nums">
                {formatCurrencyIN(result.sgst)}
              </span>
            </div>
          </>
        )}
        <p className="text-[11px] text-[#5B5B66] pt-1">
          Rounded to 2 decimal places using half-up standard financial conventions.
        </p>
      </div>
    </div>
  );
};

