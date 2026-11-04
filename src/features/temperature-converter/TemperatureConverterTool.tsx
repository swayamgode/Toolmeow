'use client';

import React, { useState } from 'react';
import { convertTemperature, type TempUnit } from '@/lib/tools/utilities';
import { CopyButton } from '@/components/feedback/CopyButton';

const UNITS: { key: TempUnit; label: string; symbol: string }[] = [
  { key: 'celsius', label: 'Celsius', symbol: '°C' },
  { key: 'fahrenheit', label: 'Fahrenheit', symbol: '°F' },
  { key: 'kelvin', label: 'Kelvin', symbol: 'K' },
  { key: 'rankine', label: 'Rankine', symbol: '°R' },
];

export const TemperatureConverterTool: React.FC = () => {
  const [value, setValue] = useState('100');
  const [from, setFrom] = useState<TempUnit>('celsius');

  const result = convertTemperature(parseFloat(value) || 0, from);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {UNITS.map(({ key, label }) => (
          <button key={key} onClick={() => setFrom(key)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${from === key ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700" htmlFor="temp-input">
          Temperature in {UNITS.find((u) => u.key === from)?.label}
        </label>
        <input id="temp-input" type="number" value={value} onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
          aria-label="Temperature value" />
      </div>

      <div className="space-y-2" aria-live="polite">
        {UNITS.filter((u) => u.key !== from).map(({ key, label, symbol }) => (
          <div key={key} className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <div>
              <span className="text-xs text-gray-500">{label}</span>
              <div className="text-xl font-bold text-violet-700">
                {result[key]} {symbol}
              </div>
            </div>
            <CopyButton textToCopy={`${result[key]} ${symbol}`} label="Copy" />
          </div>
        ))}
      </div>
    </div>
  );
};

