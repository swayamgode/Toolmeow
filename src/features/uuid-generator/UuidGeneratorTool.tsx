'use client';

import React, { useState, useMemo } from 'react';
import { generateUuids } from '@/lib/tools/dev';
import { CopyButton } from '@/components/feedback/CopyButton';
import { RefreshCw } from 'lucide-react';

export const UuidGeneratorTool: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [brackets, setBrackets] = useState<boolean>(false);
  const [seed, setSeed] = useState<number>(0);

  const uuids = useMemo(() => {
    return generateUuids({ quantity, uppercase, hyphens, brackets });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, uppercase, hyphens, brackets, seed]);

  const allText = uuids.join('\n');

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="p-5 rounded-2xl border border-[#E7E7E4] bg-white space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
            Number of UUIDs to Generate: <span className="text-[#0B0B0F]">{quantity}</span>
          </label>
          <div className="flex items-center gap-2">
            {[1, 5, 10, 25, 50].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setQuantity(n)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  quantity === n
                    ? 'bg-[#4F46E5] text-white'
                    : 'bg-[#F4F4F2] text-[#5B5B66] hover:bg-[#E7E7E4]'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[#E7E7E4] hover:bg-[#F4F4F2] cursor-pointer text-xs font-medium text-[#0B0B0F]">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="w-4 h-4 rounded text-[#4F46E5]"
            />
            <span>UPPERCASE</span>
          </label>
          <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[#E7E7E4] hover:bg-[#F4F4F2] cursor-pointer text-xs font-medium text-[#0B0B0F]">
            <input
              type="checkbox"
              checked={hyphens}
              onChange={(e) => setHyphens(e.target.checked)}
              className="w-4 h-4 rounded text-[#4F46E5]"
            />
            <span>Include Hyphens (-)</span>
          </label>
          <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[#E7E7E4] hover:bg-[#F4F4F2] cursor-pointer text-xs font-medium text-[#0B0B0F]">
            <input
              type="checkbox"
              checked={brackets}
              onChange={(e) => setBrackets(e.target.checked)}
              className="w-4 h-4 rounded text-[#4F46E5]"
            />
            <span>Enclose in Braces &#123;&#125;</span>
          </label>
        </div>
      </div>

      {/* Output Header */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
          Generated UUID v4 List
        </label>
        <div className="flex items-center gap-2">
          <CopyButton textToCopy={allText} label="Copy All UUIDs" />
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

      {/* Output Box */}
      <div className="divide-y divide-[#E7E7E4] border border-[#E7E7E4] rounded-2xl bg-white overflow-hidden max-h-[460px] overflow-y-auto">
        {uuids.map((id, idx) => (
          <div
            key={idx}
            className="p-3.5 flex items-center justify-between hover:bg-[#FAF9FB] transition-colors text-xs font-mono"
          >
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[#5B5B66] select-none w-6">{idx + 1}.</span>
              <span className="text-[#0B0B0F] font-bold select-all">{id}</span>
            </div>
            <CopyButton textToCopy={id} label="Copy" />
          </div>
        ))}
      </div>
    </div>
  );
};
