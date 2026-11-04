'use client';

import React, { useState } from 'react';
import { intToRoman, romanToInt } from '@/lib/tools/utilities';
import { CopyButton } from '@/components/feedback/CopyButton';
import { ArrowUpDown } from 'lucide-react';

export const RomanNumeralConverterTool: React.FC = () => {
  const [mode, setMode] = useState<'toRoman' | 'toInt'>('toRoman');
  const [input, setInput] = useState('2024');

  const result = mode === 'toRoman'
    ? intToRoman(parseInt(input) || 0)
    : String(romanToInt(input) ?? 'Invalid Roman numeral');

  const output = result;

  const swap = () => {
    setMode((m) => (m === 'toRoman' ? 'toInt' : 'toRoman'));
    setInput(output !== 'Invalid Roman numeral' && !output.startsWith('Invalid') ? output : '');
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {([{ val: 'toRoman', label: 'Integer → Roman' }, { val: 'toInt', label: 'Roman → Integer' }] as const).map(({ val, label }) => (
          <button key={val} onClick={() => { setMode(val); setInput(val === 'toRoman' ? '2024' : 'MMXXIV'); }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === val ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700" htmlFor="roman-input">
          {mode === 'toRoman' ? 'Integer (1 – 3999)' : 'Roman Numeral'}
        </label>
        <input id="roman-input" type="text" value={input} onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-lg focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
          placeholder={mode === 'toRoman' ? '2024' : 'MMXXIV'}
          aria-label="Input" />
      </div>

      <div className="flex justify-center">
        <button onClick={swap}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          aria-label="Swap">
          <ArrowUpDown className="h-4 w-4" /> Swap
        </button>
      </div>

      <div className="rounded-xl border border-violet-200 bg-violet-50 p-5 text-center" aria-live="polite">
        <div className="text-4xl font-bold text-violet-700 font-mono tracking-wider">{output}</div>
      </div>

      <div className="flex justify-center">
        <CopyButton textToCopy={output} label="Copy Result" />
      </div>

      {/* Quick reference */}
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">Quick Reference</div>
        <div className="grid grid-cols-7 text-center text-xs font-mono py-2">
          {[['I','1'],['V','5'],['X','10'],['L','50'],['C','100'],['D','500'],['M','1000']].map(([r,n]) => (
            <div key={r} className="py-1">
              <div className="font-bold text-violet-700 text-sm">{r}</div>
              <div className="text-gray-500">{n}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

