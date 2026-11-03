'use client';

import React, { useState } from 'react';
import { encodeHtmlEntities, decodeHtmlEntities } from '@/lib/tools/dev';
import { CopyButton } from '@/components/feedback/CopyButton';
import { RotateCcw, ArrowRightLeft } from 'lucide-react';

export const HtmlEntityConverterTool: React.FC = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState<string>(
    '<div class="header">\n  <h1>Tom & Jerry\'s "Special" Treat</h1>\n</div>'
  );

  const output = mode === 'encode' ? encodeHtmlEntities(input) : decodeHtmlEntities(input);

  const handleSwap = () => {
    if (output) {
      setInput(output);
      setMode(mode === 'encode' ? 'decode' : 'encode');
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between border-b border-[#E7E7E4] pb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode('encode')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === 'encode'
                ? 'bg-[#4F46E5] text-white shadow-xs'
                : 'bg-white text-[#5B5B66] border border-[#E7E7E4] hover:bg-[#F4F4F2]'
            }`}
          >
            HTML Entity Encode
          </button>
          <button
            type="button"
            onClick={() => setMode('decode')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === 'decode'
                ? 'bg-[#4F46E5] text-white shadow-xs'
                : 'bg-white text-[#5B5B66] border border-[#E7E7E4] hover:bg-[#F4F4F2]'
            }`}
          >
            HTML Entity Decode
          </button>
        </div>

        <button
          type="button"
          onClick={handleSwap}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E7E7E4] bg-white text-xs font-semibold text-[#5B5B66] hover:bg-[#F4F4F2] transition-colors cursor-pointer"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Swap</span>
        </button>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
            {mode === 'encode' ? 'Raw Characters / Markup' : 'HTML Entities Input'}
          </label>
          <button
            type="button"
            onClick={() => setInput('')}
            className="text-xs text-[#5B5B66] hover:text-[#DC2626] cursor-pointer inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          placeholder={mode === 'encode' ? 'Enter characters like <, >, &, ", \'...' : 'Enter entities like &lt;, &gt;, &amp;...'}
          className="w-full p-4 rounded-2xl border border-[#E7E7E4] bg-white text-xs font-mono text-[#0B0B0F] placeholder-[#5B5B66] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] leading-relaxed resize-y"
        />
      </div>

      {/* Output */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
            {mode === 'encode' ? 'Encoded HTML Entities' : 'Decoded Characters'}
          </label>
          <CopyButton textToCopy={output} label="Copy Output" />
        </div>
        <textarea
          readOnly
          value={output}
          rows={6}
          className="w-full p-4 rounded-2xl border border-[#E7E7E4] bg-[#FAF9FB] text-xs font-mono text-[#0B0B0F] leading-relaxed resize-y focus:outline-none"
        />
      </div>
    </div>
  );
};

