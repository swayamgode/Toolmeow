'use client';

import React, { useState } from 'react';
import {
  UNIT_CATEGORIES,
  convertUnit,
  type UnitCategory,
} from '@/lib/tools/units';
import { ResultPanel } from '@/components/feedback/ResultPanel';
import { ArrowLeftRight } from 'lucide-react';

export const UnitConverterTool: React.FC = () => {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [value, setValue] = useState<number>(1);
  const [fromUnitId, setFromUnitId] = useState<string>('mi');
  const [toUnitId, setToUnitId] = useState<string>('m');
  const [precision, setPrecision] = useState<number>(4);

  const activeCategory = UNIT_CATEGORIES[category];

  // Convert
  const converted = convertUnit({
    category,
    fromUnitId,
    toUnitId,
    value: isNaN(value) ? 0 : value,
  });

  const fromUnit = activeCategory.units.find((u) => u.id === fromUnitId);
  const toUnit = activeCategory.units.find((u) => u.id === toUnitId);

  const handleSwap = () => {
    const temp = fromUnitId;
    setFromUnitId(toUnitId);
    setToUnitId(temp);
  };

  const handleCategoryChange = (cat: UnitCategory) => {
    setCategory(cat);
    const newCat = UNIT_CATEGORIES[cat];
    if (newCat.units.length >= 2) {
      setFromUnitId(newCat.units[0].id);
      setToUnitId(newCat.units[1].id);
    }
  };

  const formattedResult = Number.isFinite(converted)
    ? `${parseFloat(converted.toFixed(precision))} ${toUnit?.symbol || ''}`
    : '0';

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div>
        <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-2">
          Measurement Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          {Object.values(UNIT_CATEGORIES).map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                category === cat.id
                  ? 'bg-[#0B0B0F] text-white border-[#0B0B0F] shadow-sm'
                  : 'bg-white text-[#5B5B66] border-[#E7E7E4] hover:bg-[#F4F4F2]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs & Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
        {/* Value */}
        <div className="md:col-span-3">
          <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
            Convert Value
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={isNaN(value) ? '' : value}
              onChange={(e) => setValue(parseFloat(e.target.value))}
              className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-base font-semibold text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] tabular-nums"
              step="any"
            />
            <select
              value={fromUnitId}
              onChange={(e) => setFromUnitId(e.target.value)}
              className="h-11 px-3 rounded-xl border border-[#E7E7E4] bg-[#FAFAF9] text-xs font-bold text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            >
              {activeCategory.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center md:col-span-1 pt-4 md:pt-0">
          <button
            type="button"
            onClick={handleSwap}
            className="w-10 h-10 rounded-full border border-[#E7E7E4] bg-white hover:bg-[#F4F4F2] text-[#0B0B0F] flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Swap Units"
            aria-label="Swap Units"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* Target Unit Selector */}
        <div className="md:col-span-3">
          <label className="block text-xs font-bold text-[#5B5B66] uppercase tracking-wider mb-1.5">
            Into Unit
          </label>
          <select
            value={toUnitId}
            onChange={(e) => setToUnitId(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl border border-[#E7E7E4] bg-white text-sm font-semibold text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          >
            {activeCategory.units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Decimal Precision Control */}
      <div className="flex items-center gap-2 text-xs text-[#5B5B66]">
        <span>Decimal Precision:</span>
        <div className="flex items-center gap-1">
          {[2, 4, 6, 8].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPrecision(p)}
              className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                precision === p ? 'bg-[#0B0B0F] text-white' : 'bg-[#F4F4F2] text-[#5B5B66]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Result Display */}
      <ResultPanel
        label={`${value || 0} ${fromUnit?.symbol || ''} =`}
        value={formattedResult}
        secondaryInfo={`Standard Base Unit: ${activeCategory.baseUnit}`}
      />

      {/* Full Conversion Equivalent Table */}
      <div className="border border-[#E7E7E4] rounded-2xl p-4 bg-[#FAFAF9] space-y-3">
        <h4 className="text-xs font-bold text-[#0B0B0F] uppercase tracking-wider">
          Equivalent Matrix for {value || 0} {fromUnit?.name}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
          {activeCategory.units.map((u) => {
            const eq = convertUnit({
              category,
              fromUnitId,
              toUnitId: u.id,
              value: isNaN(value) ? 0 : value,
            });
            return (
              <div
                key={u.id}
                className={`p-2.5 rounded-lg border bg-white flex justify-between items-center ${
                  u.id === toUnitId ? 'border-[#4F46E5] bg-[#EEF0FF]/30' : 'border-[#E7E7E4]'
                }`}
              >
                <span className="text-[#5B5B66]">{u.name}:</span>
                <span className="font-bold text-[#0B0B0F] tabular-nums">
                  {parseFloat(eq.toFixed(precision))} {u.symbol}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

