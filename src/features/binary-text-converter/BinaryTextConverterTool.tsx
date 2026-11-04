'use client';

import React, { useState } from 'react';
import { textToBinary, binaryToText } from '@/lib/tools/utilities';
import { CopyButton } from '@/components/feedback/CopyButton';
import { ArrowUpDown } from 'lucide-react';

export const BinaryTextConverterTool: React.FC = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('Hello World');

  const output = mode === 'encode' ? textToBinary(input) : binaryToText(input);

  const swap = () => {
    setMode((m) => (m === 'encode' ? 'decode' : 'encode'));
    setInput(output);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['encode', 'decode'] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === m ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {m === 'encode' ? 'Text → Binary' : 'Binary → Text'}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700" htmlFor="bin-input">
          {mode === 'encode' ? 'Text Input' : 'Binary Input (space-separated 8-bit groups)'}
        </label>
        <textarea id="bin-input" value={input} onChange={(e) => setInput(e.target.value)} rows={4}
          placeholder={mode === 'encode' ? 'Type text here...' : '01001000 01100101 01101100 01101100 01101111'}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200 resize-y"
          aria-label="Input" />
      </div>

      <div className="flex justify-center">
        <button onClick={swap}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          aria-label="Swap">
          <ArrowUpDown className="h-4 w-4" /> Swap
        </button>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            {mode === 'encode' ? 'Binary Output' : 'Text Output'}
          </label>
          <CopyButton textToCopy={output} label="Copy" />
        </div>
        <div className="min-h-[96px] rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm text-gray-800 break-all whitespace-pre-wrap" aria-live="polite">
          {output || <span className="text-gray-400">Output appears here…</span>}
        </div>
      </div>

      {mode === 'encode' && input && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
          <div className="text-xs text-gray-500 mb-2">Character breakdown:</div>
          <div className="flex flex-wrap gap-2">
            {input.slice(0, 20).split('').map((char, i) => (
              <div key={i} className="text-center">
                <div className="text-xs font-mono text-violet-700">{char.charCodeAt(0).toString(2).padStart(8, '0')}</div>
                <div className="text-xs text-gray-500 mt-0.5">{char === ' ' ? '(sp)' : char}</div>
              </div>
            ))}
            {input.length > 20 && <div className="text-xs text-gray-400 self-end">+{input.length - 20} more</div>}
          </div>
        </div>
      )}
    </div>
  );
};

