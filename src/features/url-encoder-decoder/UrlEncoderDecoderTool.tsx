'use client';

import React, { useState } from 'react';
import { processUrl } from '@/lib/tools/dev';
import { CopyButton } from '@/components/feedback/CopyButton';
import { RotateCcw } from 'lucide-react';

export const UrlEncoderDecoderTool: React.FC = () => {
  const [input, setInput] = useState<string>(
    'https://example.com/search?query=hello world&category=tools&sort=desc#results'
  );

  const { encoded, decoded, queryParams } = processUrl(input);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
            Input URL or URI String
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
          rows={4}
          placeholder="Enter text or URL to encode or decode..."
          className="w-full p-4 rounded-2xl border border-[#E7E7E4] bg-white text-xs font-mono text-[#0B0B0F] placeholder-[#5B5B66] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] leading-relaxed resize-y"
        />
      </div>

      {/* Outputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Encoded */}
        <div className="p-4 rounded-2xl border border-[#E7E7E4] bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#4F46E5] uppercase tracking-wider">
              URL Encoded (Percent-encoded)
            </span>
            <CopyButton textToCopy={encoded} label="Copy" />
          </div>
          <textarea
            readOnly
            value={encoded}
            rows={5}
            className="w-full p-3 rounded-xl border border-[#E7E7E4] bg-[#FAF9FB] text-xs font-mono text-[#0B0B0F] leading-relaxed resize-y focus:outline-none"
          />
        </div>

        {/* Decoded */}
        <div className="p-4 rounded-2xl border border-[#E7E7E4] bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              URL Decoded (Human Readable)
            </span>
            <CopyButton textToCopy={decoded} label="Copy" />
          </div>
          <textarea
            readOnly
            value={decoded}
            rows={5}
            className="w-full p-3 rounded-xl border border-[#E7E7E4] bg-[#FAF9FB] text-xs font-mono text-[#0B0B0F] leading-relaxed resize-y focus:outline-none"
          />
        </div>
      </div>

      {/* Parsed Query Parameters */}
      {queryParams.length > 0 && (
        <div className="p-5 rounded-2xl border border-[#E7E7E4] bg-white space-y-3">
          <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider block">
            Parsed Query Parameters ({queryParams.length})
          </label>
          <div className="border border-[#E7E7E4] rounded-xl overflow-hidden divide-y divide-[#E7E7E4] text-xs font-mono">
            {queryParams.map((param, idx) => (
              <div key={idx} className="p-2.5 flex items-center justify-between hover:bg-[#FAF9FB]">
                <span className="font-bold text-[#4F46E5]">{param.key}</span>
                <span className="text-[#0B0B0F] bg-[#EEF0FF] px-2 py-0.5 rounded select-all">
                  {param.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
