'use client';

import React, { useState } from 'react';
import { calculateEMI } from '@/lib/tools/emi';
import { formatCurrencyIN } from '@/lib/format';
import { ResultPanel } from '@/components/feedback/ResultPanel';
import { DownloadButton } from '@/components/feedback/DownloadButton';

export const EmiCalculatorTool: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(1000000);
  const [rate, setRate] = useState<number>(10);
  const [tenureVal, setTenureVal] = useState<number>(10);
  const [tenureUnit, setTenureUnit] = useState<'years' | 'months'>('years');
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  const tenureMonths = tenureUnit === 'years' ? tenureVal * 12 : tenureVal;

  const result = calculateEMI({
    principal,
    annualRate: rate,
    tenureMonths,
  });

  const principalRatio =
    result.totalPayment > 0 ? (result.principal / result.totalPayment) * 100 : 50;
  const interestRatio = 100 - principalRatio;

  const handleDownloadCSV = () => {
    let csv = 'Month,Opening Balance (INR),EMI (INR),Principal Paid (INR),Interest Paid (INR),Closing Balance (INR)\n';
    for (const row of result.schedule) {
      csv += `${row.month},${row.openingBalance},${row.emi},${row.principal},${row.interest},${row.closingBalance}\n`;
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'loan-amortization-schedule.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
            Loan Principal (₹)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 text-base font-bold text-[#5B5B66]">₹</span>
            <input
              type="number"
              value={isNaN(principal) ? '' : principal}
              onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
              className="w-full h-11 pl-8 pr-3.5 rounded-xl border border-[#E7E7E4] bg-white text-base font-semibold text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] tabular-nums"
              min="0"
              step="10000"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
            Annual Interest Rate (%)
          </label>
          <div className="relative">
            <input
              type="number"
              value={isNaN(rate) ? '' : rate}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-base font-semibold text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] tabular-nums"
              min="0"
              max="100"
              step="0.1"
            />
            <span className="absolute right-3.5 top-2.5 text-sm font-bold text-[#5B5B66]">%</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
              Tenure
            </label>
            <div className="flex items-center gap-1 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => {
                  if (tenureUnit !== 'years') {
                    setTenureUnit('years');
                    setTenureVal(Math.max(1, Math.round(tenureVal / 12)));
                  }
                }}
                className={`px-1.5 py-0.5 rounded ${
                  tenureUnit === 'years' ? 'bg-[#0B0B0F] text-white' : 'text-[#5B5B66]'
                }`}
              >
                Yr
              </button>
              <button
                type="button"
                onClick={() => {
                  if (tenureUnit !== 'months') {
                    setTenureUnit('months');
                    setTenureVal(tenureVal * 12);
                  }
                }}
                className={`px-1.5 py-0.5 rounded ${
                  tenureUnit === 'months' ? 'bg-[#0B0B0F] text-white' : 'text-[#5B5B66]'
                }`}
              >
                Mo
              </button>
            </div>
          </div>
          <input
            type="number"
            value={isNaN(tenureVal) ? '' : tenureVal}
            onChange={(e) => setTenureVal(parseFloat(e.target.value) || 0)}
            className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-base font-semibold text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] tabular-nums"
            min="1"
          />
        </div>
      </div>

      {/* Primary Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ResultPanel
          label="Monthly Loan EMI"
          value={formatCurrencyIN(result.monthlyEMI)}
          className="border-[#4F46E5]/40 bg-[#EEF0FF]"
        />
        <ResultPanel
          label="Total Interest Payable"
          value={formatCurrencyIN(result.totalInterest)}
          copyable={false}
        />
        <ResultPanel
          label="Total Overall Payment"
          value={formatCurrencyIN(result.totalPayment)}
          copyable={false}
        />
      </div>

      {/* Visual Donut Chart Breakdown */}
      <div className="p-5 rounded-2xl bg-[#FAFAF9] border border-[#E7E7E4] flex flex-col sm:flex-row items-center justify-around gap-6">
        <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            {/* Background Circle */}
            <path
              className="text-[#E7E7E4]"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Principal Arc */}
            <path
              className="text-[#4F46E5]"
              strokeDasharray={`${principalRatio}, 100`}
              strokeWidth="4"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold text-[#5B5B66] uppercase">Ratio</span>
            <span className="text-xs font-extrabold text-[#0B0B0F]">
              {Math.round(principalRatio)}% P
            </span>
          </div>
        </div>

        <div className="space-y-3 w-full max-w-xs text-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[#5B5B66]">
              <span className="w-3 h-3 rounded-full bg-[#4F46E5] inline-block" />
              Principal Loan:
            </span>
            <span className="font-bold text-[#0B0B0F] tabular-nums">
              {formatCurrencyIN(result.principal)} ({Math.round(principalRatio)}%)
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[#5B5B66]">
              <span className="w-3 h-3 rounded-full bg-[#E7E7E4] inline-block" />
              Interest Amount:
            </span>
            <span className="font-bold text-[#0B0B0F] tabular-nums">
              {formatCurrencyIN(result.totalInterest)} ({Math.round(interestRatio)}%)
            </span>
          </div>
          <div className="pt-2 border-t border-[#E7E7E4] flex justify-between font-bold text-[#0B0B0F]">
            <span>Total Payable:</span>
            <span className="tabular-nums">{formatCurrencyIN(result.totalPayment)}</span>
          </div>
        </div>
      </div>

      {/* Amortization Schedule Toggle & CSV */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setShowAmortization(!showAmortization)}
          className="text-xs font-bold text-[#4F46E5] hover:underline cursor-pointer"
        >
          {showAmortization ? 'Hide Repayment Schedule' : 'View Full Monthly Amortization Schedule (120 Months)'}
        </button>
        <DownloadButton
          label="Export Schedule (.CSV)"
          onClick={handleDownloadCSV}
          className="text-xs py-2 px-4"
        />
      </div>

      {/* Full Amortization Table */}
      {showAmortization && (
        <div className="border border-[#E7E7E4] rounded-2xl overflow-hidden max-h-96 overflow-y-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F4F4F2] text-[#0B0B0F] font-bold sticky top-0 border-b border-[#E7E7E4]">
              <tr>
                <th className="p-3">Month</th>
                <th className="p-3">Opening (₹)</th>
                <th className="p-3">EMI (₹)</th>
                <th className="p-3">Principal (₹)</th>
                <th className="p-3">Interest (₹)</th>
                <th className="p-3">Closing (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F2] tabular-nums">
              {result.schedule.map((row) => (
                <tr key={row.month} className="hover:bg-[#FAFAF9]">
                  <td className="p-3 font-semibold">{row.month}</td>
                  <td className="p-3 text-[#5B5B66]">{formatCurrencyIN(row.openingBalance, { hideSymbol: true })}</td>
                  <td className="p-3 font-semibold text-[#0B0B0F]">{formatCurrencyIN(row.emi, { hideSymbol: true })}</td>
                  <td className="p-3 text-[#16A34A]">{formatCurrencyIN(row.principal, { hideSymbol: true })}</td>
                  <td className="p-3 text-[#DC2626]">{formatCurrencyIN(row.interest, { hideSymbol: true })}</td>
                  <td className="p-3 text-[#0B0B0F] font-semibold">{formatCurrencyIN(row.closingBalance, { hideSymbol: true })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

