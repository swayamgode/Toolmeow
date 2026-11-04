'use client';

import React, { useState } from 'react';
import { textToMorse, morseToText } from '@/lib/tools/utils';
import { CopyButton } from '@/components/feedback/CopyButton';
import { ArrowUpDown } from 'lucide-react';

export const MorseCodeConverterTool: React.FC = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('Hello World');

  const output = mode === 'encode' ? textToMorse(input) : morseToText(input);

  const swap = () => {
    setMode((m) => (m === 'encode' ? 'decode' : 'encode'));
    setInput(output);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['encode', 'decode'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              mode === m
                ? 'bg-violet-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {m === 'encode' ? 'Text → Morse' : 'Morse → Text'}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700" htmlFor="morse-input">
          {mode === 'encode' ? 'Text Input' : 'Morse Code Input'}
        </label>
        <textarea
          id="morse-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          placeholder={mode === 'encode' ? 'Type your text here...' : '... --- ... (use / for spaces between words)'}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200 resize-y"
          aria-label="Input"
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={swap}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          aria-label="Swap input and output"
        >
          <ArrowUpDown className="h-4 w-4" />
          Swap
        </button>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            {mode === 'encode' ? 'Morse Code Output' : 'Text Output'}
          </label>
          <CopyButton textToCopy={output} label="Copy" />
        </div>
        <div
          className="min-h-[96px] rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm text-gray-800 break-all whitespace-pre-wrap"
          aria-live="polite"
          aria-label="Output"
        >
          {output || <span className="text-gray-400">Output will appear here…</span>}
        </div>
      </div>
    </div>
  );
};
