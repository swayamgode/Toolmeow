'use client';

import React, { useState } from 'react';
import { calcTip } from '@/lib/tools/utilities';

const TIP_PRESETS = [10, 15, 18, 20, 25];

export const TipCalculatorTool: React.FC = () => {
  const [bill, setBill] = useState('50');
  const [tip, setTip] = useState(18);
  const [people, setPeople] = useState('2');

  const result = calcTip(parseFloat(bill) || 0, tip, parseInt(people) || 1);
  const data = 'error' in result ? null : result;
  const error = 'error' in result ? result.error : null;

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700" htmlFor="tip-bill">Bill Amount ($)</label>
        <input id="tip-bill" type="number" min="0" step="0.01" value={bill} onChange={(e) => setBill(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
          placeholder="0.00" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Tip Percentage</span>
          <span className="text-lg font-bold text-violet-700">{tip}%</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {TIP_PRESETS.map((p) => (
            <button key={p} onClick={() => setTip(p)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${tip === p ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {p}%
            </button>
          ))}
        </div>
        <input type="range" min="0" max="50" value={tip} onChange={(e) => setTip(Number(e.target.value))}
          className="w-full accent-violet-600" aria-label="Tip percentage" />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700" htmlFor="tip-people">Number of People</label>
        <input id="tip-people" type="number" min="1" max="100" value={people} onChange={(e) => setPeople(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200" />
      </div>

      {error && <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700" role="alert">{error}</div>}

      {data && (
        <div className="grid grid-cols-2 gap-3" aria-live="polite">
          {[
            { label: 'Tip Amount', value: `$${data.tipAmount.toFixed(2)}` },
            { label: 'Total Bill', value: `$${data.totalBill.toFixed(2)}` },
            { label: 'Per Person', value: `$${data.perPerson.toFixed(2)}` },
            { label: 'Tip / Person', value: `$${data.tipPerPerson.toFixed(2)}` },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
              <div className="text-2xl font-bold text-violet-700">{value}</div>
              <div className="text-xs text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

