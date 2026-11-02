'use client';

import React, { useState } from 'react';
import { textToBase64, base64ToText } from '@/lib/tools/encoding';
import { CopyButton } from '@/components/feedback/CopyButton';
import { RotateCcw, ArrowRightLeft, Upload } from 'lucide-react';

export const Base64ConverterTool: React.FC = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState<string>('Hello World! Privacy first browser tools.');

  let output = '';
  let error = '';

  if (input) {
    try {
      if (mode === 'encode') {
        output = textToBase64(input);
      } else {
        output = base64ToText(input);
      }
    } catch {
      error = 'Invalid base64 string provided for decoding.';
      output = '';
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setInput(result);
      setMode('decode');
    };
    reader.readAsDataURL(file);
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
                ? 'bg-[#4F46E5] text-white shadow-sm'
                : 'bg-white text-[#5B5B66] border border-[#E7E7E4] hover:bg-[#F4F4F2]'
            }`}
          >
            Encode to Base64
          </button>
          <button
            type="button"
            onClick={() => setMode('decode')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === 'decode'
                ? 'bg-[#4F46E5] text-white shadow-sm'
                : 'bg-white text-[#5B5B66] border border-[#E7E7E4] hover:bg-[#F4F4F2]'
            }`}
          >
            Decode from Base64
          </button>
        </div>

        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E7E7E4] bg-white text-xs font-semibold text-[#5B5B66] hover:bg-[#F4F4F2] transition-colors cursor-pointer">
          <Upload className="w-3.5 h-3.5" />
          <span>Upload File</span>
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
            {mode === 'encode' ? 'Plain Text / Data' : 'Base64 Input'}
          </label>
          <button
            type="button"
            onClick={() => setInput('')}
            className="inline-flex items-center gap-1 text-xs text-[#5B5B66] hover:text-[#DC2626] cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Paste base64 string here...'}
          className="w-full p-4 rounded-2xl border border-[#E7E7E4] bg-white text-sm text-[#0B0B0F] placeholder-[#5B5B66] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] font-mono leading-relaxed resize-y"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
          {error}
        </div>
      )}

      {/* Output */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
            {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
          </label>
          <div className="flex items-center gap-2">
            <CopyButton textToCopy={output} label="Copy Output" />
            <button
              type="button"
              onClick={() => {
                if (output) {
                  setInput(output);
                  setMode(mode === 'encode' ? 'decode' : 'encode');
                }
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E7E7E4] bg-white text-xs font-semibold text-[#5B5B66] hover:bg-[#F4F4F2] transition-colors cursor-pointer"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Swap</span>
            </button>
          </div>
        </div>
        <textarea
          readOnly
          value={output}
          rows={5}
          placeholder="Result will appear here..."
          className="w-full p-4 rounded-2xl border border-[#E7E7E4] bg-[#F4F4F2] text-sm text-[#0B0B0F] font-mono leading-relaxed resize-y focus:outline-none"
        />
      </div>
    </div>
  );
};
