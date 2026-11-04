'use client';

import React, { useState, useCallback } from 'react';
import { convertBase } from '@/lib/tools/utils';
import { CopyButton } from '@/components/feedback/CopyButton';

type Base = 2 | 8 | 10 | 16;

export const NumberBaseConverterTool: React.FC = () => {
  const [input, setInput] = useState('255');
  const [fromBase, setFromBase] = useState<Base>(10);

  const result = convertBase(input, fromBase);

  const rows: { label: string; base: Base; value: string; placeholder: string }[] = [
    { label: 'Decimal (Base 10)', base: 10, value: result.decimal, placeholder: '255' },
    { label: 'Binary (Base 2)', base: 2, value: result.binary, placeholder: '11111111' },
    { label: 'Octal (Base 8)', base: 8, value: result.octal, placeholder: '377' },
    { label: 'Hexadecimal (Base 16)', base: 16, value: result.hex, placeholder: 'FF' },
  ];

  const handleChange = useCallback((val: string, base: Base) => {
    setInput(val);
    setFromBase(base);
  }, []);

  return (
    <div className="space-y-4">
      {result.error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700" role="alert" aria-live="polite">
          {result.error}
        </div>
      )}
      {rows.map(({ label, base, value, placeholder }) => (
        <div key={base} className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor={`base-${base}`}>
            {label}
          </label>
          <div className="flex gap-2">
            <input
              id={`base-${base}`}
              type="text"
              value={fromBase === base ? input : value}
              onChange={(e) => handleChange(e.target.value, base)}
              onFocus={() => setFromBase(base)}
              placeholder={placeholder}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
              aria-label={label}
            />
            <CopyButton textToCopy={value} label="Copy" />
          </div>
        </div>
      ))}
    </div>
  );
};
