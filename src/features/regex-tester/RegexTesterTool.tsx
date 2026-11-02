'use client';

import React, { useState } from 'react';
import { testRegex, type RegexTestResult } from '@/lib/tools/regex';
import { CopyButton } from '@/components/feedback/CopyButton';
import { CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';

export const RegexTesterTool: React.FC = () => {
  const [pattern, setPattern] = useState<string>('([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})');
  const [flags, setFlags] = useState<{ g: boolean; i: boolean; m: boolean; s: boolean }>({
    g: true,
    i: true,
    m: false,
    s: false,
  });
  const [testText, setTestText] = useState<string>(
    'Reach out to sales@example.com or support@company.org for assistance.'
  );
  const [replaceWith, setReplaceWith] = useState<string>('REDACTED_EMAIL');

  const flagStr = Object.entries(flags)
    .filter(([, active]) => active)
    .map(([key]) => key)
    .join('');

  const result: RegexTestResult = testRegex(pattern, flagStr, testText, replaceWith);

  const toggleFlag = (flag: keyof typeof flags) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  return (
    <div className="space-y-6">
      {/* Pattern and Flag Bar */}
      <div className="p-5 rounded-2xl border border-[#E7E7E4] bg-white space-y-3">
        <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider block">
          Regular Expression Pattern
        </label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex-1 flex items-center border border-[#E7E7E4] rounded-xl px-3 bg-white focus-within:ring-2 focus-within:ring-[#4F46E5]">
            <span className="text-[#5B5B66] font-mono select-none pr-1">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              className="flex-1 py-2.5 font-mono text-sm text-[#0B0B0F] focus:outline-none"
            />
            <span className="text-[#5B5B66] font-mono select-none pl-1">/{flagStr}</span>
          </div>

          {/* Flag Toggles */}
          <div className="flex items-center gap-1.5 justify-end">
            {(['g', 'i', 'm', 's'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => toggleFlag(f)}
                className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  flags[f]
                    ? 'bg-[#4F46E5] text-white shadow-xs'
                    : 'bg-[#F4F4F2] text-[#5B5B66] hover:bg-[#E7E7E4]'
                }`}
                title={`Toggle flag: ${f}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Validation Status */}
        <div className="flex items-center justify-between text-xs pt-1">
          {result.isValid ? (
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Valid Pattern ({result.matches.length} matches found in {result.executionTimeMs}ms)
            </span>
          ) : (
            <span className="flex items-center gap-1 text-rose-600 font-medium">
              <AlertCircle className="w-4 h-4" />
              Syntax Error: {result.errorMessage}
            </span>
          )}
        </div>
      </div>

      {/* Test String */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
            Test String
          </label>
          <button
            type="button"
            onClick={() => setTestText('')}
            className="text-xs text-[#5B5B66] hover:text-[#DC2626] cursor-pointer inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
        <textarea
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          rows={5}
          placeholder="Type or paste test text to match against..."
          className="w-full p-4 rounded-2xl border border-[#E7E7E4] bg-white text-xs font-mono text-[#0B0B0F] placeholder-[#5B5B66] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] leading-relaxed resize-y"
        />
      </div>

      {/* Match Results Table */}
      <div className="p-5 rounded-2xl border border-[#E7E7E4] bg-white space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
            Match Details & Capture Groups
          </label>
          <span className="text-xs text-[#5B5B66]">{result.matches.length} match(es)</span>
        </div>

        {result.matches.length === 0 ? (
          <div className="p-4 text-center text-xs text-[#5B5B66] italic bg-[#F4F4F2] rounded-xl">
            No matches found for current test string and expression.
          </div>
        ) : (
          <div className="divide-y divide-[#E7E7E4] border border-[#E7E7E4] rounded-xl overflow-hidden max-h-60 overflow-y-auto">
            {result.matches.map((m, idx) => (
              <div key={idx} className="p-3 text-xs font-mono space-y-1 bg-white hover:bg-[#F4F4F2]/50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#4F46E5]">Match #{idx + 1}:</span>
                  <span className="text-[11px] text-[#5B5B66]">
                    Index: {m.index}..{m.index + m.length}
                  </span>
                </div>
                <div className="bg-[#EEF0FF] p-2 rounded text-[#0B0B0F] break-all">
                  &quot;{m.match}&quot;
                </div>
                {m.groups.length > 0 && (
                  <div className="pl-3 border-l-2 border-[#4F46E5] mt-1 space-y-0.5">
                    {m.groups.map((grp, gIdx) => (
                      <div key={gIdx} className="text-[11px] text-[#5B5B66]">
                        Group {gIdx + 1}: <span className="text-[#0B0B0F] font-semibold">&quot;{grp}&quot;</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Replacement Preview */}
      <div className="p-5 rounded-2xl border border-[#E7E7E4] bg-white space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
            Substitution / Replace
          </label>
          <CopyButton textToCopy={result.replacedText || ''} label="Copy Result" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#5B5B66] font-medium">Replace with:</span>
          <input
            type="text"
            value={replaceWith}
            onChange={(e) => setReplaceWith(e.target.value)}
            className="flex-1 p-2 rounded-lg border border-[#E7E7E4] text-xs font-mono text-[#0B0B0F]"
          />
        </div>
        <textarea
          readOnly
          value={result.replacedText || ''}
          rows={3}
          className="w-full p-3 rounded-xl border border-[#E7E7E4] bg-[#F4F4F2] text-xs font-mono text-[#0B0B0F] leading-relaxed resize-y focus:outline-none"
        />
      </div>
    </div>
  );
};

