'use client';

import React, { useState, useMemo } from 'react';
import { analyzeCharacters } from '@/lib/tools/utils';

const DEFAULT_TEXT = 'The quick brown fox jumps over the lazy dog.';

export const CharacterCounterTool: React.FC = () => {
  const [text, setText] = useState(DEFAULT_TEXT);

  const stats = useMemo(() => analyzeCharacters(text), [text]);

  const readMin = Math.floor(stats.readingTimeSeconds / 60);
  const readSec = stats.readingTimeSeconds % 60;
  const readLabel = readMin > 0 ? `${readMin}m ${readSec}s` : `${readSec}s`;

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700" htmlFor="cc-input">Input Text</label>
        <textarea
          id="cc-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="Paste or type your text here…"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200 resize-y"
          aria-label="Text input"
        />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-live="polite">
        {[
          { label: 'Characters', value: stats.total },
          { label: 'Letters', value: stats.letters },
          { label: 'Digits', value: stats.digits },
          { label: 'Spaces', value: stats.spaces },
          { label: 'Special', value: stats.special },
          { label: 'Unique chars', value: stats.unique },
          { label: 'Sentences', value: stats.sentences },
          { label: 'Paragraphs', value: stats.paragraphs },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
            <div className="text-xl font-bold text-violet-700">{value}</div>
            <div className="text-xs text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 flex-wrap text-sm text-gray-600">
        <span>Avg word length: <strong>{stats.avgWordLength}</strong></span>
        <span>Reading time: <strong>{readLabel}</strong></span>
      </div>

      {/* Frequency table */}
      {stats.mostFrequent.length > 0 && (
        <div className="space-y-2">
          <span className="text-sm font-medium text-gray-700">Top 10 Characters</span>
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-gray-600">Char</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-600">Count</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-600">Frequency</th>
                </tr>
              </thead>
              <tbody>
                {stats.mostFrequent.map(({ char, count }) => (
                  <tr key={char} className="border-t border-gray-100">
                    <td className="px-3 py-1.5 font-mono font-bold text-violet-700">
                      {char === ' ' ? '(space)' : char === '\n' ? '(newline)' : char}
                    </td>
                    <td className="px-3 py-1.5">{count}</td>
                    <td className="px-3 py-1.5">
                      {stats.total > 0 ? ((count / stats.total) * 100).toFixed(1) : 0}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

