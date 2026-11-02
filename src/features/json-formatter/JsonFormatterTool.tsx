'use client';

import React, { useState } from 'react';
import { formatJSON, minifyJSON, parseJSONWithLocation, type JSONParseError } from '@/lib/tools/json';
import { CopyButton } from '@/components/feedback/CopyButton';
import { DownloadButton } from '@/components/feedback/DownloadButton';
import { ErrorAlert } from '@/components/feedback/ErrorAlert';
import { CheckCircle2, RotateCcw } from 'lucide-react';

export const JsonFormatterTool: React.FC = () => {
  const [inputJson, setInputJson] = useState<string>(
    '{"product":"ToolMeow","version":1.0,"features":["100% private","no uploads","client-side"],"author":{"name":"ToolMeow","country":"India"}}'
  );
  const [error, setError] = useState<JSONParseError | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleFormat = (indent: 2 | 4) => {
    setError(null);
    setSuccessMsg(null);
    const res = formatJSON(inputJson, indent, false);
    if (res.success && res.formatted) {
      setInputJson(res.formatted);
      setSuccessMsg(`Formatted cleanly with ${indent}-space indentation.`);
    } else if (res.error) {
      setError(res.error);
    }
  };

  const handleSortKeys = () => {
    setError(null);
    setSuccessMsg(null);
    const res = formatJSON(inputJson, 2, true);
    if (res.success && res.formatted) {
      setInputJson(res.formatted);
      setSuccessMsg('Formatted and object keys sorted alphabetically.');
    } else if (res.error) {
      setError(res.error);
    }
  };

  const handleMinify = () => {
    setError(null);
    setSuccessMsg(null);
    const res = minifyJSON(inputJson);
    if (res.success && res.minified) {
      setInputJson(res.minified);
      setSuccessMsg('Minified payload. All non-essential spaces stripped.');
    } else if (res.error) {
      setError(res.error);
    }
  };

  const handleValidate = () => {
    setError(null);
    setSuccessMsg(null);
    const res = parseJSONWithLocation(inputJson);
    if (res.success) {
      setSuccessMsg('Valid JSON! Syntax is completely compliant.');
    } else if (res.error) {
      setError(res.error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([inputJson], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E7E7E4]">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleFormat(2)}
            className="px-3 py-1.5 rounded-lg bg-[#0B0B0F] text-white text-xs font-semibold shadow-btn hover:bg-[#1E1E24] cursor-pointer"
          >
            Beautify (2 Spaces)
          </button>
          <button
            type="button"
            onClick={() => handleFormat(4)}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#E7E7E4] text-[#0B0B0F] text-xs font-semibold hover:bg-[#F4F4F2] cursor-pointer"
          >
            Beautify (4 Spaces)
          </button>
          <button
            type="button"
            onClick={handleMinify}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#E7E7E4] text-[#0B0B0F] text-xs font-semibold hover:bg-[#F4F4F2] cursor-pointer"
          >
            Minify
          </button>
          <button
            type="button"
            onClick={handleSortKeys}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#E7E7E4] text-[#0B0B0F] text-xs font-semibold hover:bg-[#F4F4F2] cursor-pointer"
          >
            Sort Keys
          </button>
          <button
            type="button"
            onClick={handleValidate}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#E7E7E4] text-[#4F46E5] text-xs font-semibold hover:bg-[#EEF0FF] cursor-pointer"
          >
            Validate
          </button>
        </div>

        <div className="flex items-center gap-2">
          <CopyButton textToCopy={inputJson} label="Copy JSON" />
          <DownloadButton label="Download .json" onClick={handleDownload} className="text-xs py-1.5 px-3" />
          <button
            type="button"
            onClick={() => {
              setInputJson('');
              setError(null);
              setSuccessMsg(null);
            }}
            className="p-1.5 text-[#5B5B66] hover:text-[#DC2626] rounded-lg hover:bg-[#F4F4F2]"
            title="Clear"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Error or Success notification */}
      {error && (
        <ErrorAlert
          message={`Syntax Error: ${error.message} (Line ${error.line}, Column ${error.column})`}
          onDismiss={() => setError(null)}
        />
      )}
      {successMsg && (
        <div className="p-3 rounded-xl bg-[#DCFCE7] border border-[#16A34A]/30 text-[#16A34A] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Editor Area */}
      <div>
        <textarea
          value={inputJson}
          onChange={(e) => {
            setInputJson(e.target.value);
            setError(null);
            setSuccessMsg(null);
          }}
          rows={16}
          placeholder="Paste raw JSON here..."
          className="w-full p-4 rounded-2xl border border-[#E7E7E4] bg-[#FAFAF9] font-mono text-xs sm:text-sm text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] leading-relaxed resize-y"
          spellCheck={false}
        />
      </div>
    </div>
  );
};

