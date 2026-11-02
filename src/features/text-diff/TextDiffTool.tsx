'use client';

import React, { useState } from 'react';
import { computeDiff, type DiffResult } from '@/lib/tools/text';
import { CopyButton } from '@/components/feedback/CopyButton';
import { RotateCcw } from 'lucide-react';

export const TextDiffTool: React.FC = () => {
  const [original, setOriginal] = useState<string>(
    'The quick brown fox jumps over the lazy dog.\nToolMeow provides free utilities.\nPure client side processing.'
  );
  const [modified, setModified] = useState<string>(
    'The quick brown fox leaps over the lazy dog.\nToolMeow provides 100% free browser utilities.\nPure client side processing.'
  );

  const diff: DiffResult = computeDiff(original, modified);

  return (
    <div className="space-y-6">
      {/* Inputs Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
              Original Text
            </label>
            <button
              type="button"
              onClick={() => setOriginal('')}
              className="text-xs text-[#5B5B66] hover:text-[#DC2626] cursor-pointer inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            rows={7}
            placeholder="Paste original version..."
            className="w-full p-3.5 rounded-2xl border border-[#E7E7E4] bg-white text-xs font-mono text-[#0B0B0F] placeholder-[#5B5B66] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] leading-relaxed resize-y"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
              Modified Text
            </label>
            <button
              type="button"
              onClick={() => setModified('')}
              className="text-xs text-[#5B5B66] hover:text-[#DC2626] cursor-pointer inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            rows={7}
            placeholder="Paste modified version..."
            className="w-full p-3.5 rounded-2xl border border-[#E7E7E4] bg-white text-xs font-mono text-[#0B0B0F] placeholder-[#5B5B66] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] leading-relaxed resize-y"
          />
        </div>
      </div>

      {/* Diff Metrics Header */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E7E7E4]">
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="text-[#0B0B0F]">
            Status: {diff.identical ? 'Identical' : 'Changes Detected'}
          </span>
          <span className="text-emerald-600">+{diff.additions} added</span>
          <span className="text-rose-600">-{diff.deletions} removed</span>
        </div>
        <CopyButton
          textToCopy={diff.lines
            .map(
              (l) =>
                `${l.type === 'added' ? '+' : l.type === 'removed' ? '-' : ' '} ${l.value}`
            )
            .join('\n')}
          label="Copy Diff Patch"
        />
      </div>

      {/* Diff Visual Viewer */}
      <div className="border border-[#E7E7E4] rounded-2xl bg-white overflow-hidden shadow-sm">
        <div className="bg-[#F4F4F2] px-4 py-2 border-b border-[#E7E7E4] text-[11px] font-bold text-[#5B5B66] uppercase tracking-wider flex justify-between">
          <span>Unified Diff Preview</span>
          <span>Line by Line</span>
        </div>
        <div className="divide-y divide-[#E7E7E4] font-mono text-xs overflow-x-auto max-h-[480px]">
          {diff.lines.length === 0 ? (
            <div className="p-8 text-center text-[#5B5B66] italic">
              Enter text above to see visual differences.
            </div>
          ) : (
            diff.lines.map((line, idx) => (
              <div
                key={idx}
                className={`flex items-start px-3 py-1.5 transition-colors ${
                  line.type === 'added'
                    ? 'bg-emerald-50 text-emerald-900 border-l-4 border-emerald-500'
                    : line.type === 'removed'
                    ? 'bg-rose-50 text-rose-900 border-l-4 border-rose-500'
                    : 'text-[#0B0B0F]'
                }`}
              >
                <div className="w-12 shrink-0 select-none text-[10px] text-[#5B5B66] flex justify-between pr-2">
                  <span>{line.leftLineNum ?? ''}</span>
                  <span>{line.rightLineNum ?? ''}</span>
                </div>
                <div className="w-5 select-none font-bold shrink-0">
                  {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                </div>
                <div className="whitespace-pre-wrap break-all flex-1">{line.value || ' '}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

