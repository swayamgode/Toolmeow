'use client';

import React, { useState } from 'react';
import { decodeJwt } from '@/lib/tools/dev';
import { CopyButton } from '@/components/feedback/CopyButton';
import { ShieldCheck, ShieldAlert, RotateCcw } from 'lucide-react';

const SAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEyMzQ1IiwibmFtZSI6IkFsZXggTW9yZ2FuIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.4z94vYc0f8qfX3eQ9z5uP1n6kR8v0s3w_8j2xL7m';

export const JwtDecoderTool: React.FC = () => {
  const [token, setToken] = useState<string>(SAMPLE_JWT);

  const decoded = decodeJwt(token);

  return (
    <div className="space-y-6">
      {/* Privacy Callout */}
      <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
        <span className="flex items-center gap-2 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>100% Client-Side. Your secret token never leaves your browser.</span>
        </span>
        <button
          type="button"
          onClick={() => setToken(SAMPLE_JWT)}
          className="text-emerald-700 underline font-bold cursor-pointer hover:text-emerald-900"
        >
          Load Sample
        </button>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
            Encoded JWT Token String
          </label>
          <button
            type="button"
            onClick={() => setToken('')}
            className="text-xs text-[#5B5B66] hover:text-[#DC2626] cursor-pointer inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          rows={4}
          placeholder="Paste your JSON Web Token (header.payload.signature) here..."
          className="w-full p-4 rounded-2xl border border-[#E7E7E4] bg-white text-xs font-mono text-[#0B0B0F] placeholder-[#5B5B66] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] leading-relaxed resize-y break-all"
        />
      </div>

      {/* Token Decoded Status & Error */}
      {!decoded.valid ? (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{decoded.error}</span>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Expiration Banner */}
          {decoded.expiresAt && (
            <div
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between ${
                decoded.isExpired
                  ? 'bg-rose-50 border-rose-200 text-rose-700'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}
            >
              <span>
                Status: {decoded.isExpired ? 'Token Expired' : 'Token Valid (Not Expired)'}
              </span>
              <span>Expires at: {decoded.expiresAt}</span>
            </div>
          )}

          {/* Header & Payload Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Header */}
            <div className="p-4 rounded-2xl border border-[#E7E7E4] bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                  Header (Algorithm & Token Type)
                </span>
                <CopyButton
                  textToCopy={JSON.stringify(decoded.header, null, 2)}
                  label="Copy"
                />
              </div>
              <pre className="p-3 rounded-xl bg-[#FAF9FB] text-xs font-mono text-[#0B0B0F] overflow-x-auto">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>

            {/* Payload */}
            <div className="p-4 rounded-2xl border border-[#E7E7E4] bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#4F46E5] uppercase tracking-wider">
                  Payload (Claims & Data)
                </span>
                <CopyButton
                  textToCopy={JSON.stringify(decoded.payload, null, 2)}
                  label="Copy"
                />
              </div>
              <pre className="p-3 rounded-xl bg-[#FAF9FB] text-xs font-mono text-[#0B0B0F] overflow-x-auto">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>
          </div>

          {/* Signature info */}
          <div className="p-4 rounded-2xl border border-[#E7E7E4] bg-white space-y-1">
            <span className="text-[11px] font-bold text-[#5B5B66] uppercase tracking-wider block">
              Signature Hash
            </span>
            <div className="font-mono text-xs text-[#5B5B66] bg-[#FAF9FB] p-2.5 rounded-xl break-all">
              {decoded.signature || 'None'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
