'use client';

import React, { useState } from 'react';
import {
  parseCronExpression,
  describeCron,
  buildCronExpression,
  type CronField,
} from '@/lib/tools/utils';
import { CopyButton } from '@/components/feedback/CopyButton';

const PRESETS: { label: string; cron: string }[] = [
  { label: 'Every minute', cron: '* * * * *' },
  { label: 'Every hour', cron: '0 * * * *' },
  { label: 'Every day midnight', cron: '0 0 * * *' },
  { label: 'Every Sunday midnight', cron: '0 0 * * 0' },
  { label: 'Every Mon–Fri 9am', cron: '0 9 * * 1-5' },
  { label: 'Every 15 minutes', cron: '*/15 * * * *' },
  { label: '1st of each month', cron: '0 0 1 * *' },
];

export const CronExpressionBuilderTool: React.FC = () => {
  const [raw, setRaw] = useState('0 9 * * 1-5');

  const { fields, error } = parseCronExpression(raw);
  const description = error ? error : describeCron(fields);

  const updateField = (key: keyof CronField, value: string) => {
    const updated: CronField = { ...fields, [key]: value || '*' };
    setRaw(buildCronExpression(updated));
  };

  const fieldDefs: { key: keyof CronField; label: string; placeholder: string }[] = [
    { key: 'minute', label: 'Minute', placeholder: '0-59 or *' },
    { key: 'hour', label: 'Hour', placeholder: '0-23 or *' },
    { key: 'dayOfMonth', label: 'Day of Month', placeholder: '1-31 or *' },
    { key: 'month', label: 'Month', placeholder: '1-12 or *' },
    { key: 'dayOfWeek', label: 'Day of Week', placeholder: '0-6 or *' },
  ];

  return (
    <div className="space-y-5">
      {/* Raw input */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700" htmlFor="cron-raw">Cron Expression</label>
        <div className="flex gap-2">
          <input
            id="cron-raw"
            type="text"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
            placeholder="* * * * *"
            aria-label="Cron expression"
          />
          <CopyButton textToCopy={raw} label="Copy" />
        </div>
      </div>

      {/* Description */}
      <div className={`rounded-lg border p-3 text-sm ${error ? 'border-red-200 bg-red-50 text-red-700' : 'border-green-200 bg-green-50 text-green-800'}`} aria-live="polite">
        {description}
      </div>

      {/* Field editors */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {fieldDefs.map(({ key, label, placeholder }) => (
          <div key={key} className="space-y-1">
            <label className="text-xs font-medium text-gray-600" htmlFor={`cron-${key}`}>{label}</label>
            <input
              id={`cron-${key}`}
              type="text"
              value={fields[key]}
              onChange={(e) => updateField(key, e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-lg border border-gray-300 px-2 py-1.5 font-mono text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
          </div>
        ))}
      </div>

      {/* Presets */}
      <div className="space-y-2">
        <span className="text-sm font-medium text-gray-700">Common Presets</span>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(({ label, cron }) => (
            <button
              key={cron}
              onClick={() => setRaw(cron)}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
