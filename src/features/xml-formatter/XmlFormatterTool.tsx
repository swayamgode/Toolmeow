'use client';

import React, { useState, useMemo } from 'react';
import { formatXml, minifyXml, validateXml } from '@/lib/tools/utilities';
import { CopyButton } from '@/components/feedback/CopyButton';

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?><root><user id="1"><name>Alice</name><email>alice@example.com</email></user><user id="2"><name>Bob</name><email>bob@example.com</email></user></root>`;

export const XmlFormatterTool: React.FC = () => {
  const [input, setInput] = useState(SAMPLE_XML);
  const [indent, setIndent] = useState(2);
  const [mode, setMode] = useState<'format' | 'minify'>('format');

  const output = useMemo(() => {
    if (!input.trim()) return '';
    return mode === 'format' ? formatXml(input, indent) : minifyXml(input);
  }, [input, indent, mode]);

  const validation = useMemo(() => validateXml(input), [input]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {(['format', 'minify'] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${mode === m ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {m === 'format' ? 'Beautify / Format' : 'Minify'}
          </button>
        ))}
        {mode === 'format' && (
          <div className="flex items-center gap-2 ml-auto text-sm text-gray-600">
            <label htmlFor="xml-indent">Indent:</label>
            <select id="xml-indent" value={indent} onChange={(e) => setIndent(Number(e.target.value))}
              className="rounded border border-gray-300 px-2 py-1 text-sm">
              {[2, 4, 8].map((n) => <option key={n} value={n}>{n} spaces</option>)}
            </select>
          </div>
        )}
      </div>

      <div
        className={`rounded-lg border px-3 py-2 text-xs font-medium ${validation.valid ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'}`}
        aria-live="polite"
      >
        {validation.valid ? '✓ Valid XML' : `✗ ${validation.error?.slice(0, 120)}`}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="xml-input">Input XML</label>
          <textarea id="xml-input" value={input} onChange={(e) => setInput(e.target.value)} rows={12}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-xs focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200 resize-y"
            aria-label="XML input" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Output</label>
            <CopyButton textToCopy={output} label="Copy" />
          </div>
          <pre className="h-[280px] overflow-auto rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-xs text-gray-800 whitespace-pre">
            {output || <span className="text-gray-400">Output appears here…</span>}
          </pre>
        </div>
      </div>
    </div>
  );
};

