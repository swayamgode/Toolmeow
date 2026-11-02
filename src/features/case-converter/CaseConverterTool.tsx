'use client';

import React, { useState } from 'react';
import { convertCase, type CaseType } from '@/lib/tools/text';
import { CopyButton } from '@/components/feedback/CopyButton';
import { RotateCcw } from 'lucide-react';

export const CaseConverterTool: React.FC = () => {
  const [text, setText] = useState<string>(
    'Convert any text easily to UPPERCASE, lowercase, Title Case, camelCase, kebab-case, and more.'
  );

  const cases: { id: CaseType; label: string; desc: string }[] = [
    { id: 'upper', label: 'UPPERCASE', desc: 'ALL CAPITAL LETTERS' },
    { id: 'lower', label: 'lowercase', desc: 'all small letters' },
    { id: 'title', label: 'Title Case', desc: 'First Letter Of Each Word' },
    { id: 'sentence', label: 'Sentence case', desc: 'First letter of sentence' },
    { id: 'camel', label: 'camelCase', desc: 'standardDeveloperVariable' },
    { id: 'pascal', label: 'PascalCase', desc: 'ClassAndComponentNames' },
    { id: 'snake', label: 'snake_case', desc: 'python_database_keys' },
    { id: 'kebab', label: 'kebab-case', desc: 'url-friendly-slugs' },
    { id: 'constant', label: 'CONSTANT_CASE', desc: 'GLOBAL_CONFIG_CONSTANTS' },
    { id: 'alternating', label: 'aLtErNaTiNg', desc: 'mOcKiNg tExT fOrMaT' },
  ];

  const applyCase = (type: CaseType) => {
    setText((prev) => convertCase(prev, type));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
          Input Text
        </label>
        <div className="flex items-center gap-2">
          <CopyButton textToCopy={text} label="Copy Text" />
          <button
            type="button"
            onClick={() => setText('')}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E7E7E4] bg-white text-xs font-semibold text-[#5B5B66] hover:text-[#DC2626] hover:bg-[#F4F4F2] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text to convert..."
        rows={6}
        className="w-full p-4 rounded-2xl border border-[#E7E7E4] bg-white text-sm text-[#0B0B0F] placeholder-[#5B5B66] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] leading-relaxed resize-y"
      />

      <div>
        <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider block mb-3">
          Click to Convert
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {cases.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => applyCase(c.id)}
              className="p-3 text-left rounded-xl border border-[#E7E7E4] bg-white hover:border-[#4F46E5] hover:bg-[#EEF0FF] transition-all cursor-pointer group"
            >
              <span className="block text-sm font-bold text-[#0B0B0F] group-hover:text-[#4F46E5]">
                {c.label}
              </span>
              <span className="block text-[11px] text-[#5B5B66] truncate mt-0.5">
                {c.desc}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

