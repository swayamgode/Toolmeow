'use client';

import React, { useState } from 'react';
import { csvToJson, jsonToCsv } from '@/lib/tools/encoding';
import { CopyButton } from '@/components/feedback/CopyButton';
import { DownloadButton } from '@/components/feedback/DownloadButton';
import { ArrowRightLeft, RotateCcw } from 'lucide-react';

export const CsvJsonConverterTool: React.FC = () => {
  const [mode, setMode] = useState<'csv-to-json' | 'json-to-csv'>('csv-to-json');
  const [delimiter, setDelimiter] = useState<string>(',');
  const [input, setInput] = useState<string>(
    'name,role,department,location\nAlex Morgan,Frontend Lead,Engineering,San Francisco\nJordan Lee,Product Designer,UX Design,Berlin\nSam Taylor,Data Scientist,Analytics,Tokyo'
  );

  let output = '';
  let error = '';

  if (input.trim()) {
    if (mode === 'csv-to-json') {
      const res = csvToJson(input, delimiter);
      if (res.error) {
        error = res.error;
      } else {
        output = JSON.stringify(res.data, null, 2);
      }
    } else {
      const res = jsonToCsv(input, delimiter);
      if (res.error) {
        error = res.error;
      } else {
        output = res.csv;
      }
    }
  }

  const handleSwap = () => {
    if (output) {
      setInput(output);
      setMode(mode === 'csv-to-json' ? 'json-to-csv' : 'csv-to-json');
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], {
      type: mode === 'csv-to-json' ? 'application/json' : 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'csv-to-json' ? 'converted.json' : 'converted.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7E7E4] pb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode('csv-to-json')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === 'csv-to-json'
                ? 'bg-[#4F46E5] text-white shadow-sm'
                : 'bg-white text-[#5B5B66] border border-[#E7E7E4] hover:bg-[#F4F4F2]'
            }`}
          >
            CSV to JSON
          </button>
          <button
            type="button"
            onClick={() => setMode('json-to-csv')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === 'json-to-csv'
                ? 'bg-[#4F46E5] text-white shadow-sm'
                : 'bg-white text-[#5B5B66] border border-[#E7E7E4] hover:bg-[#F4F4F2]'
            }`}
          >
            JSON to CSV
          </button>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs text-[#5B5B66] font-medium flex items-center gap-1.5">
            <span>Delimiter:</span>
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="bg-white border border-[#E7E7E4] rounded-lg px-2 py-1 text-xs text-[#0B0B0F] cursor-pointer"
            >
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="	">Tab (\t)</option>
              <option value="|">Pipe (|)</option>
            </select>
          </label>
        </div>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
            {mode === 'csv-to-json' ? 'Input CSV Text' : 'Input JSON Array'}
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
          rows={7}
          placeholder={mode === 'csv-to-json' ? 'Paste CSV content here...' : 'Paste JSON array here...'}
          className="w-full p-4 rounded-2xl border border-[#E7E7E4] bg-white text-xs font-mono text-[#0B0B0F] placeholder-[#5B5B66] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] leading-relaxed resize-y"
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
            {mode === 'csv-to-json' ? 'Converted JSON' : 'Converted CSV'}
          </label>
          <div className="flex items-center gap-2">
            <CopyButton textToCopy={output} label="Copy" />
            <DownloadButton
              onClick={handleDownload}
              disabled={!output}
              label="Download"
            />
            <button
              type="button"
              onClick={handleSwap}
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
          rows={8}
          placeholder="Output will appear here..."
          className="w-full p-4 rounded-2xl border border-[#E7E7E4] bg-[#F4F4F2] text-xs font-mono text-[#0B0B0F] leading-relaxed resize-y focus:outline-none"
        />
      </div>
    </div>
  );
};
