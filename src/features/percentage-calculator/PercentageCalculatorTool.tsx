'use client';

import React, { useState } from 'react';
import {
  calculatePercentOf,
  calculateIsWhatPercentOf,
  calculatePercentageChange,
  calculateIncreaseByPercent,
  calculateDecreaseByPercent,
  calculateReversePercent,
  type PercentageMode,
} from '@/lib/tools/percentage';
import { ResultPanel } from '@/components/feedback/ResultPanel';

export const PercentageCalculatorTool: React.FC = () => {
  const [mode, setMode] = useState<PercentageMode>('percentOf');
  const [valA, setValA] = useState<number>(15);
  const [valB, setValB] = useState<number>(200);

  let result = 0;
  let formulaText = '';
  let resultLabel = 'Calculated Value';

  switch (mode) {
    case 'percentOf':
      result = calculatePercentOf(valA, valB);
      formulaText = `(${valA} / 100) × ${valB} = ${result}`;
      resultLabel = `${valA}% of ${valB}`;
      break;
    case 'isWhatPercentOf':
      result = calculateIsWhatPercentOf(valA, valB);
      formulaText = `(${valA} / ${valB}) × 100 = ${result.toFixed(2)}%`;
      resultLabel = `${valA} is what % of ${valB}`;
      break;
    case 'percentageChange':
      result = calculatePercentageChange(valA, valB);
      formulaText = `((${valB} - ${valA}) / ${valA}) × 100 = ${result >= 0 ? '+' : ''}${result.toFixed(2)}%`;
      resultLabel = `% Change from ${valA} to ${valB}`;
      break;
    case 'increaseByPercent':
      result = calculateIncreaseByPercent(valA, valB);
      formulaText = `${valA} × (1 + ${valB}/100) = ${result}`;
      resultLabel = `${valA} increased by ${valB}%`;
      break;
    case 'decreaseByPercent':
      result = calculateDecreaseByPercent(valA, valB);
      formulaText = `${valA} × (1 - ${valB}/100) = ${result}`;
      resultLabel = `${valA} decreased by ${valB}%`;
      break;
    case 'reversePercent':
      result = calculateReversePercent(valA, valB);
      formulaText = `(${valA} / ${valB}) × 100 = ${result}`;
      resultLabel = `${valA} is ${valB}% of what`;
      break;
  }

  const modes: { id: PercentageMode; label: string }[] = [
    { id: 'percentOf', label: 'X% of Y' },
    { id: 'isWhatPercentOf', label: 'X is what % of Y' },
    { id: 'percentageChange', label: '% Change (X to Y)' },
    { id: 'increaseByPercent', label: 'Increase X by Y%' },
    { id: 'decreaseByPercent', label: 'Decrease X by Y%' },
    { id: 'reversePercent', label: 'Reverse (X is Y% of ?)' },
  ];

  return (
    <div className="space-y-6">
      {/* Mode Selector Tabs */}
      <div>
        <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-2">
          Calculation Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all text-left cursor-pointer ${
                mode === m.id
                  ? 'bg-[#0B0B0F] text-white border-[#0B0B0F] shadow-sm'
                  : 'bg-white text-[#5B5B66] border-[#E7E7E4] hover:bg-[#F4F4F2]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
            {mode === 'percentOf'
              ? 'Percentage (%)'
              : mode === 'isWhatPercentOf'
              ? 'Part Value (X)'
              : mode === 'percentageChange'
              ? 'Initial Value (From)'
              : mode === 'increaseByPercent' || mode === 'decreaseByPercent'
              ? 'Starting Amount (X)'
              : 'Final Amount (X)'}
          </label>
          <input
            type="number"
            value={isNaN(valA) ? '' : valA}
            onChange={(e) => setValA(parseFloat(e.target.value))}
            className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-base font-semibold text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] tabular-nums"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
            {mode === 'percentOf'
              ? 'Base Amount (Y)'
              : mode === 'isWhatPercentOf'
              ? 'Total Value (Y)'
              : mode === 'percentageChange'
              ? 'Final Value (To)'
              : mode === 'increaseByPercent' || mode === 'decreaseByPercent'
              ? 'Percentage Change (%)'
              : 'Percentage Proportion (Y%)'}
          </label>
          <input
            type="number"
            value={isNaN(valB) ? '' : valB}
            onChange={(e) => setValB(parseFloat(e.target.value))}
            className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-base font-semibold text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] tabular-nums"
          />
        </div>
      </div>

      {/* Result Panel */}
      <ResultPanel
        label={resultLabel}
        value={
          Number.isFinite(result)
            ? mode === 'isWhatPercentOf' || mode === 'percentageChange'
              ? `${result >= 0 && mode === 'percentageChange' ? '+' : ''}${parseFloat(result.toFixed(4))}%`
              : parseFloat(result.toFixed(4)).toLocaleString('en-IN')
            : '0'
        }
        secondaryInfo={`Formula: ${formulaText}`}
      />
    </div>
  );
};

