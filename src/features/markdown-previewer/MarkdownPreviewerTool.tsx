'use client';

import React, { useState } from 'react';
import { parseMarkdown } from '@/lib/tools/markdown';
import { CopyButton } from '@/components/feedback/CopyButton';
import { DownloadButton } from '@/components/feedback/DownloadButton';
import { RotateCcw } from 'lucide-react';

const INITIAL_MD = `# Welcome to Markdown Previewer

A clean, **fast**, and *private* markdown editor that runs completely inside your browser.

## Features:
- Real-time live HTML rendering
- Headings, lists, code snippets, blockquotes
- Zero server calls: 100% client-side

### Code Snippet Example:
\`\`\`javascript
function greet(user) {
  return "Hello, " + user + "!";
}
console.log(greet("Developer"));
\`\`\`

> "Simplicity is prerequisite for reliability." — Edsger W. Dijkstra

Feel free to write or paste your markdown here!
`;

export const MarkdownPreviewerTool: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(INITIAL_MD);

  const htmlOutput = parseMarkdown(markdown);

  const downloadFile = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7E7E4] pb-4">
        <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
          Live Markdown Editor & Preview
        </label>
        <div className="flex items-center gap-2">
          <CopyButton textToCopy={htmlOutput} label="Copy HTML" />
          <DownloadButton
            onClick={() => downloadFile(markdown, 'document.md', 'text/markdown;charset=utf-8;')}
            label="Export .md"
          />
          <DownloadButton
            onClick={() => downloadFile(htmlOutput, 'rendered.html', 'text/html;charset=utf-8;')}
            label="Export .html"
          />
          <button
            type="button"
            onClick={() => setMarkdown('')}
            className="text-xs text-[#5B5B66] hover:text-[#DC2626] cursor-pointer inline-flex items-center gap-1 ml-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Markdown Source */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-[#5B5B66] uppercase tracking-wider block">
            Markdown Input
          </span>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            rows={18}
            placeholder="Type markdown here..."
            className="w-full p-4 rounded-2xl border border-[#E7E7E4] bg-white text-xs font-mono text-[#0B0B0F] placeholder-[#5B5B66] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] leading-relaxed resize-y"
          />
        </div>

        {/* Live HTML Preview */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-[#5B5B66] uppercase tracking-wider block">
            HTML Preview
          </span>
          <div
            className="w-full min-h-[380px] p-6 rounded-2xl border border-[#E7E7E4] bg-white overflow-y-auto max-h-[600px] prose prose-slate prose-sm"
            dangerouslySetInnerHTML={{ __html: htmlOutput }}
          />
        </div>
      </div>
    </div>
  );
};
