'use client';

import React, { useState } from 'react';
import { calculateSIP } from '@/lib/tools/sip';
import { formatCurrencyIN } from '@/lib/format';
import { ResultPanel } from '@/components/feedback/ResultPanel';

export const SipCalculatorTool: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [returnRate, setReturnRate] = useState<number>(12);
  const [tenureYears, setTenureYears] = useState<number>(10);
  const [stepUp, setStepUp] = useState<number>(0);
  const [showYearly, setShowYearly] = useState<boolean>(false);

  const result = calculateSIP({
    monthlyInvestment,
    annualReturnRate: returnRate,
    tenureYears,
    annualStepUpPercent: stepUp,
  });

  const investedRatio =
    result.futureValue > 0 ? (result.investedAmount / result.futureValue) * 100 : 50;

  return (
    <div className="space-y-6">
      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
            Monthly Investment (₹)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 text-base font-bold text-[#5B5B66]">₹</span>
            <input
              type="number"
              value={isNaN(monthlyInvestment) ? '' : monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(parseFloat(e.target.value) || 0)}
              className="w-full h-11 pl-8 pr-3.5 rounded-xl border border-[#E7E7E4] bg-white text-base font-semibold text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] tabular-nums"
              min="100"
              step="500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
            Expected Return Rate (% p.a)
          </label>
          <div className="relative">
            <input
              type="number"
              value={isNaN(returnRate) ? '' : returnRate}
              onChange={(e) => setReturnRate(parseFloat(e.target.value) || 0)}
              className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-base font-semibold text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] tabular-nums"
              min="1"
              max="50"
              step="0.5"
            />
            <span className="absolute right-3.5 top-2.5 text-sm font-bold text-[#5B5B66]">%</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
            Time Period (Years)
          </label>
          <input
            type="number"
            value={isNaN(tenureYears) ? '' : tenureYears}
            onChange={(e) => setTenureYears(parseFloat(e.target.value) || 0)}
            className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-base font-semibold text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] tabular-nums"
            min="1"
            max="40"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
            Annual Step-Up (% Optional)
          </label>
          <div className="relative">
            <input
              type="number"
              value={isNaN(stepUp) ? '' : stepUp}
              onChange={(e) => setStepUp(parseFloat(e.target.value) || 0)}
              className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-base font-semibold text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] tabular-nums"
              min="0"
              max="50"
              step="1"
            />
            <span className="absolute right-3.5 top-2.5 text-sm font-bold text-[#5B5B66]">%</span>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ResultPanel
          label="Total Invested Amount"
          value={formatCurrencyIN(result.investedAmount)}
          copyable={false}
        />
        <ResultPanel
          label="Estimated Wealth Gain"
          value={formatCurrencyIN(result.estReturns)}
          copyable={false}
          className="border-[#16A34A]/30 bg-[#DCFCE7]/30"
        />
        <ResultPanel
          label="Projected Maturity Value"
          value={formatCurrencyIN(result.futureValue)}
          className="border-[#4F46E5]/40 bg-[#EEF0FF]"
        />
      </div>

      {/* Visual Growth Breakdown Bar */}
      <div className="p-5 rounded-2xl bg-[#FAFAF9] border border-[#E7E7E4] space-y-4">
        <div className="flex justify-between text-xs font-bold text-[#0B0B0F]">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#5B5B66] inline-block" />
            Invested Capital: {formatCurrencyIN(result.investedAmount)} ({Math.round(investedRatio)}%)
          </span>
          <span className="flex items-center gap-1.5 text-[#16A34A]">
            <span className="w-3 h-3 rounded-sm bg-[#16A34A] inline-block" />
            Compounded Gains: {formatCurrencyIN(result.estReturns)} ({Math.round(100 - investedRatio)}%)
          </span>
        </div>

        {/* Stacked Bar */}
        <div className="h-4 w-full bg-[#E7E7E4] rounded-full overflow-hidden flex">
          <div
            className="bg-[#5B5B66] h-full transition-all duration-300"
            style={{ width: `${investedRatio}%` }}
          />
          <div
            className="bg-[#16A34A] h-full transition-all duration-300"
            style={{ width: `${100 - investedRatio}%` }}
          />
        </div>

        <p className="text-[11px] text-[#5B5B66] italic text-center">
          *Assumption: Investment occurs at the beginning of each calendar month. Mutual fund returns are subject to market conditions and are not guaranteed.
        </p>
      </div>

      {/* Toggle Yearly Schedule */}
      <div>
        <button
          type="button"
          onClick={() => setShowYearly(!showYearly)}
          className="text-xs font-bold text-[#4F46E5] hover:underline cursor-pointer"
        >
          {showYearly ? 'Hide Yearly Growth Breakdown' : 'View Yearly Growth Breakdown'}
        </button>
      </div>

      {showYearly && (
        <div className="border border-[#E7E7E4] rounded-2xl overflow-hidden max-h-80 overflow-y-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F4F4F2] text-[#0B0B0F] font-bold sticky top-0 border-b border-[#E7E7E4]">
              <tr>
                <th className="p-3">Year</th>
                <th className="p-3">Total Invested (₹)</th>
                <th className="p-3">Future Value (₹)</th>
                <th className="p-3">Gains Earned (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F2] tabular-nums">
              {result.breakdown.map((row) => (
                <tr key={row.year} className="hover:bg-[#FAFAF9]">
                  <td className="p-3 font-semibold">Year {row.year}</td>
                  <td className="p-3 text-[#5B5B66]">{formatCurrencyIN(row.investedAmount)}</td>
                  <td className="p-3 font-bold text-[#0B0B0F]">{formatCurrencyIN(row.futureValue)}</td>
                  <td className="p-3 font-semibold text-[#16A34A]">{formatCurrencyIN(row.returns)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

