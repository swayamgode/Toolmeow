'use client';

import React, { useState, useMemo } from 'react';
import { analyzeString } from '@/lib/tools/utilities';
import { CopyButton } from '@/components/feedback/CopyButton';

export const StringUtilitiesTool: React.FC = () => {
  const [input, setInput] = useState('Hello World — this is a test string!');

  const stats = useMemo(() => analyzeString(input), [input]);

  const rows: { label: string; value: string }[] = [
    { label: 'Reversed', value: stats.reversed },
    { label: 'URL Slug', value: stats.slug },
    { label: 'Title Case', value: stats.titleCase },
    { label: 'camelCase', value: stats.camelCase },
    { label: 'snake_case', value: stats.snakeCase },
    { label: 'Trimmed', value: stats.trimmed },
    { label: 'Normalized Spaces', value: stats.noExtraSpaces },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700" htmlFor="str-input">Input Text</label>
        <textarea id="str-input" value={input} onChange={(e) => setInput(e.target.value)} rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200 resize-y"
          aria-label="Input text" />
      </div>

      <div className="flex gap-4 text-sm text-gray-600 flex-wrap">
        <span>Characters: <strong>{stats.charCount}</strong></span>
        <span>Words: <strong>{stats.wordCount}</strong></span>
        <span className={`font-medium ${stats.palindrome ? 'text-green-600' : 'text-gray-500'}`}>
          {stats.palindrome ? '✓ Palindrome' : '✗ Not a palindrome'}
        </span>
      </div>

      <div className="space-y-2" aria-live="polite">
        {rows.map(({ label, value }) => (
          <div key={label} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5">
            <div className="text-xs text-gray-500 mb-1">{label}</div>
            <div className="flex items-center justify-between gap-2">
              <div className="font-mono text-sm text-gray-800 break-all flex-1">{value || <span className="text-gray-400">—</span>}</div>
              {value && <CopyButton textToCopy={value} label="Copy" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

