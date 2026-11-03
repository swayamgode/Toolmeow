'use client';

import React, { useState, useMemo } from 'react';
import { generateLorem, type LoremOptions } from '@/lib/tools/dev';
import { CopyButton } from '@/components/feedback/CopyButton';
import { RefreshCw } from 'lucide-react';

export const LoremIpsumGeneratorTool: React.FC = () => {
  const [type, setType] = useState<LoremOptions['type']>('paragraphs');
  const [count, setCount] = useState<number>(3);
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [seed, setSeed] = useState<number>(0);

  const text = useMemo(() => {
    return generateLorem({ type, count, startWithLorem });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, count, startWithLorem, seed]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="p-5 rounded-2xl border border-[#E7E7E4] bg-white space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  type === t
                    ? 'bg-[#4F46E5] text-white shadow-xs'
                    : 'bg-white text-[#5B5B66] border border-[#E7E7E4] hover:bg-[#F4F4F2]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
              Count:
            </label>
            <input
              type="number"
              min={1}
              max={50}
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 p-2 rounded-lg border border-[#E7E7E4] text-xs font-bold text-[#0B0B0F] text-center"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-[#E7E7E4]">
          <label className="flex items-center gap-2.5 text-xs font-medium text-[#0B0B0F] cursor-pointer">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="w-4 h-4 rounded text-[#4F46E5]"
            />
            <span>Start with &quot;Lorem ipsum dolor sit amet...&quot;</span>
          </label>
        </div>
      </div>

      {/* Output Header */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
          Generated Placeholder Text
        </label>
        <div className="flex items-center gap-2">
          <CopyButton textToCopy={text} label="Copy Text" />
          <button
            type="button"
            onClick={() => setSeed((s) => s + 1)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#4F46E5] text-white text-xs font-semibold hover:bg-[#4338CA] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerate</span>
          </button>
        </div>
      </div>

      {/* Output Textarea */}
      <textarea
        readOnly
        value={text}
        rows={12}
        className="w-full p-4 rounded-2xl border border-[#E7E7E4] bg-white text-sm text-[#0B0B0F] leading-relaxed resize-y focus:outline-none"
      />
    </div>
  );
};
