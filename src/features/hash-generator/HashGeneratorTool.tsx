'use client';

import React, { useState, useEffect } from 'react';
import { computeHash, type HashAlgorithm } from '@/lib/tools/security';
import { CopyButton } from '@/components/feedback/CopyButton';
import { RotateCcw } from 'lucide-react';

export const HashGeneratorTool: React.FC = () => {
  const [text, setText] = useState<string>('The quick brown fox jumps over the lazy dog');
  const [hashes, setHashes] = useState<Record<HashAlgorithm, string>>({
    'SHA-1': '',
    'SHA-256': '',
    'SHA-384': '',
    'SHA-512': '',
  });

  useEffect(() => {
    let active = true;
    const targetText = text;

    Promise.all([
      targetText ? computeHash(targetText, 'SHA-1') : Promise.resolve(''),
      targetText ? computeHash(targetText, 'SHA-256') : Promise.resolve(''),
      targetText ? computeHash(targetText, 'SHA-384') : Promise.resolve(''),
      targetText ? computeHash(targetText, 'SHA-512') : Promise.resolve(''),
    ]).then(([sha1, sha256, sha384, sha512]) => {
      if (active) {
        setHashes({
          'SHA-1': sha1,
          'SHA-256': sha256,
          'SHA-384': sha384,
          'SHA-512': sha512,
        });
      }
    });

    return () => {
      active = false;
    };
  }, [text]);

  const algos: HashAlgorithm[] = ['SHA-256', 'SHA-512', 'SHA-1', 'SHA-384'];

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
            Input Plaintext / String
          </label>
          <button
            type="button"
            onClick={() => setText('')}
            className="text-xs text-[#5B5B66] hover:text-[#DC2626] cursor-pointer inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Type or paste text to generate cryptographic checksums..."
          className="w-full p-4 rounded-2xl border border-[#E7E7E4] bg-white text-sm text-[#0B0B0F] placeholder-[#5B5B66] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] leading-relaxed resize-y"
        />
      </div>

      {/* Hashes List */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider block">
          Computed Cryptographic Hashes (Browser Web Crypto API)
        </label>

        {algos.map((algo) => (
          <div key={algo} className="p-4 rounded-2xl border border-[#E7E7E4] bg-white space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#4F46E5] uppercase tracking-wider">
                {algo}
              </span>
              <CopyButton textToCopy={hashes[algo]} label="Copy Hash" />
            </div>
            <div className="bg-[#F4F4F2] p-3 rounded-xl border border-[#E7E7E4]/70 font-mono text-xs text-[#0B0B0F] break-all select-all">
              {hashes[algo] || 'Enter text above to compute hash'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
