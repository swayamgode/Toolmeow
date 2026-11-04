'use client';

import React, { useState, useMemo } from 'react';
import { generateRandomNumbers } from '@/lib/tools/utils';
import { CopyButton } from '@/components/feedback/CopyButton';
import { RefreshCw } from 'lucide-react';

export const RandomNumberGeneratorTool: React.FC = () => {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('10');
  const [unique, setUnique] = useState(false);
  const [decimals, setDecimals] = useState(0);
  const [seed, setSeed] = useState(0);

  const result = useMemo(() => {
    return generateRandomNumbers(
      parseFloat(min) || 0,
      parseFloat(max) || 100,
      parseInt(count) || 1,
      unique,
      decimals
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max, count, unique, decimals, seed]);

  const output = 'error' in result ? '' : result.values.join(', ');
  const error = 'error' in result ? result.error : null;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="rng-min">Min</label>
          <input id="rng-min" type="number" value={min} onChange={(e) => setMin(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="rng-max">Max</label>
          <input id="rng-max" type="number" value={max} onChange={(e) => setMax(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="rng-count">Count</label>
          <input id="rng-count" type="number" min="1" max="1000" value={count} onChange={(e) => setCount(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="rng-decimals">Decimals</label>
          <input id="rng-decimals" type="number" min="0" max="10" value={decimals} onChange={(e) => setDecimals(parseInt(e.target.value) || 0)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200" />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} className="accent-violet-600" />
        No duplicates (unique values)
      </label>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700" role="alert" aria-live="polite">{error}</div>
      )}

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Results</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSeed((s) => s + 1)}
              className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              aria-label="Regenerate"
            >
              <RefreshCw className="h-4 w-4" /> Regenerate
            </button>
            <CopyButton textToCopy={output} label="Copy" />
          </div>
        </div>
        <div
          className="min-h-[80px] rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm text-gray-800 break-all"
          aria-live="polite"
        >
          {output || <span className="text-gray-400">Numbers appear here…</span>}
        </div>
      </div>
    </div>
  );
};
