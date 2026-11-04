'use client';

import React, { useState } from 'react';
import { calcBmi, type BmiUnit } from '@/lib/tools/utilities';

const BMI_CATEGORIES = [
  { label: 'Underweight', range: '< 18.5', color: 'text-blue-600 bg-blue-50' },
  { label: 'Normal', range: '18.5 – 24.9', color: 'text-green-600 bg-green-50' },
  { label: 'Overweight', range: '25 – 29.9', color: 'text-yellow-600 bg-yellow-50' },
  { label: 'Obese', range: '≥ 30', color: 'text-red-600 bg-red-50' },
];

export const BmiCalculatorTool: React.FC = () => {
  const [unit, setUnit] = useState<BmiUnit>('metric');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');

  const result = calcBmi(parseFloat(weight) || 0, parseFloat(height) || 0, unit);
  const bmiData = 'error' in result ? null : result;
  const error = 'error' in result ? result.error : null;

  const bmiColor = bmiData
    ? bmiData.bmi < 18.5 ? 'text-blue-600' : bmiData.bmi < 25 ? 'text-green-600' : bmiData.bmi < 30 ? 'text-yellow-600' : 'text-red-600'
    : 'text-gray-400';

  return (
    <div className="space-y-5">
      {/* Unit toggle */}
      <div className="flex gap-2">
        {(['metric', 'imperial'] as const).map((u) => (
          <button key={u} onClick={() => { setUnit(u); setWeight(u === 'metric' ? '70' : '154'); setHeight(u === 'metric' ? '175' : '69'); }}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${unit === u ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {u === 'metric' ? 'Metric (kg / cm)' : 'Imperial (lbs / in)'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="bmi-weight">
            Weight ({unit === 'metric' ? 'kg' : 'lbs'})
          </label>
          <input id="bmi-weight" type="number" min="1" value={weight} onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="bmi-height">
            Height ({unit === 'metric' ? 'cm' : 'inches'})
          </label>
          <input id="bmi-height" type="number" min="1" value={height} onChange={(e) => setHeight(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200" />
        </div>
      </div>

      {error && <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700" role="alert">{error}</div>}

      {bmiData && (
        <div className="space-y-3" aria-live="polite">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-center">
            <div className={`text-5xl font-bold ${bmiColor}`}>{bmiData.bmi}</div>
            <div className="mt-1 text-sm text-gray-500">BMI</div>
            <div className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${bmiColor}`}>
              {bmiData.category}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-3 text-sm text-gray-700">
            Ideal weight range: <strong>{bmiData.idealWeightMin} – {bmiData.idealWeightMax} {unit === 'metric' ? 'kg' : 'lbs'}</strong>
          </div>

          {/* BMI scale */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {BMI_CATEGORIES.map(({ label, range, color }) => (
              <div key={label} className={`rounded-lg p-2 text-center text-xs ${color}`}>
                <div className="font-semibold">{label}</div>
                <div>{range}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

