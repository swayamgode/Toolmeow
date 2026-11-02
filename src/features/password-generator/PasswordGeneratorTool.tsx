'use client';

import React, { useState, useMemo } from 'react';
import { generatePassword, evaluatePasswordStrength } from '@/lib/tools/security';
import { CopyButton } from '@/components/feedback/CopyButton';
import { RefreshCw, ShieldCheck, ShieldAlert } from 'lucide-react';

export const PasswordGeneratorTool: React.FC = () => {
  const [length, setLength] = useState<number>(16);
  const [uppercase, setUppercase] = useState<boolean>(true);
  const [lowercase, setLowercase] = useState<boolean>(true);
  const [numbers, setNumbers] = useState<boolean>(true);
  const [symbols, setSymbols] = useState<boolean>(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(false);
  const [seed, setSeed] = useState<number>(0);

  const password = useMemo(() => {
    return generatePassword({
      length,
      uppercase,
      lowercase,
      numbers,
      symbols,
      excludeAmbiguous,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, uppercase, lowercase, numbers, symbols, excludeAmbiguous, seed]);

  const strength = evaluatePasswordStrength(password);

  const strengthColor =
    strength.score >= 4
      ? 'bg-emerald-500 text-emerald-700'
      : strength.score >= 3
      ? 'bg-blue-500 text-blue-700'
      : strength.score >= 2
      ? 'bg-amber-500 text-amber-700'
      : 'bg-red-500 text-red-700';

  return (
    <div className="space-y-6">
      {/* Generated Password Box */}
      <div className="p-4 sm:p-6 rounded-2xl border border-[#E7E7E4] bg-white space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex-1 font-mono text-lg sm:text-2xl font-bold tracking-wider text-[#0B0B0F] break-all select-all bg-[#F4F4F2] p-3.5 rounded-xl border border-[#E7E7E4]/80">
            {password || 'Select at least one character set'}
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <CopyButton textToCopy={password} label="Copy" />
            <button
              type="button"
              onClick={() => setSeed((s) => s + 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#4F46E5] text-white text-xs font-semibold hover:bg-[#4338CA] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>
          </div>
        </div>

        {/* Strength Meter */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 font-semibold text-[#5B5B66]">
              {strength.score >= 3 ? (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              )}
              Strength: <span className="text-[#0B0B0F]">{strength.label}</span>
            </span>
            <span className="text-[#5B5B66]">~{strength.entropy} bits entropy</span>
          </div>
          <div className="w-full bg-[#E7E7E4] h-2 rounded-full overflow-hidden flex">
            <div
              className={`h-full transition-all duration-300 ${strengthColor.split(' ')[0]}`}
              style={{ width: `${Math.max(10, (strength.score + 1) * 20)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="p-5 rounded-2xl border border-[#E7E7E4] bg-white space-y-5">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
              Password Length: <span className="text-[#0B0B0F]">{length}</span>
            </label>
            <span className="text-xs text-[#5B5B66]">8 to 64</span>
          </div>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-[#4F46E5] cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: 'Uppercase (A-Z)', val: uppercase, set: setUppercase },
            { label: 'Lowercase (a-z)', val: lowercase, set: setLowercase },
            { label: 'Numbers (0-9)', val: numbers, set: setNumbers },
            { label: 'Symbols (!@#$%)', val: symbols, set: setSymbols },
            {
              label: 'Exclude Ambiguous (l, 1, O, 0)',
              val: excludeAmbiguous,
              set: setExcludeAmbiguous,
            },
          ].map((opt) => (
            <label
              key={opt.label}
              className="flex items-center gap-2.5 p-3 rounded-xl border border-[#E7E7E4] hover:bg-[#F4F4F2] cursor-pointer transition-colors text-xs font-medium text-[#0B0B0F]"
            >
              <input
                type="checkbox"
                checked={opt.val}
                onChange={(e) => opt.set(e.target.checked)}
                className="w-4 h-4 rounded text-[#4F46E5] focus:ring-[#4F46E5]"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
