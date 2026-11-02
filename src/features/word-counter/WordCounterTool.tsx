'use client';

import React, { useState } from 'react';
import { countWordsAndStats } from '@/lib/tools/wordcount';
import { CopyButton } from '@/components/feedback/CopyButton';
import { RotateCcw, Clock, Mic } from 'lucide-react';

export const WordCounterTool: React.FC = () => {
  const [text, setText] = useState<string>(
    'ToolMeow provides fast, private, browser-based utilities. All files and data are processed locally on your device without leaving your browser.'
  );
  const [filterStopWords, setFilterStopWords] = useState<boolean>(true);

  const stats = countWordsAndStats(text, { filterStopWords });

  const statsSummary = `Word Count Summary:
Words: ${stats.words}
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Lines: ${stats.lines}
Estimated Reading Time: ${stats.readingTimeMinutes} min
Estimated Speaking Time: ${stats.speakingTimeMinutes} min`;

  return (
    <div className="space-y-6">
      {/* Editor Controls */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-[#5B5B66] uppercase tracking-wider">
          Type or Paste Text Below
        </label>
        <div className="flex items-center gap-2">
          <CopyButton textToCopy={statsSummary} label="Copy Stats" />
          <button
            type="button"
            onClick={() => setText('')}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E7E7E4] bg-white text-xs font-semibold text-[#5B5B66] hover:text-[#DC2626] hover:bg-[#F4F4F2] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Main Textarea */}
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your content here to analyze..."
          rows={8}
          className="w-full p-4 rounded-2xl border border-[#E7E7E4] bg-white text-sm text-[#0B0B0F] placeholder-[#5B5B66] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] leading-relaxed resize-y"
        />
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl bg-[#EEF0FF] border border-[#4F46E5]/20 text-center">
          <span className="text-[11px] font-bold text-[#4F46E5] uppercase tracking-wider block">Words</span>
          <span className="text-2xl font-extrabold text-[#0B0B0F] tabular-nums">{stats.words.toLocaleString('en-IN')}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#FAFAF9] border border-[#E7E7E4] text-center">
          <span className="text-[11px] font-bold text-[#5B5B66] uppercase tracking-wider block">Characters</span>
          <span className="text-2xl font-extrabold text-[#0B0B0F] tabular-nums">{stats.characters.toLocaleString('en-IN')}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#FAFAF9] border border-[#E7E7E4] text-center">
          <span className="text-[11px] font-bold text-[#5B5B66] uppercase tracking-wider block">No Spaces</span>
          <span className="text-2xl font-extrabold text-[#0B0B0F] tabular-nums">{stats.charactersNoSpaces.toLocaleString('en-IN')}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#FAFAF9] border border-[#E7E7E4] text-center">
          <span className="text-[11px] font-bold text-[#5B5B66] uppercase tracking-wider block">Sentences</span>
          <span className="text-2xl font-extrabold text-[#0B0B0F] tabular-nums">{stats.sentences.toLocaleString('en-IN')}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#FAFAF9] border border-[#E7E7E4] text-center">
          <span className="text-[11px] font-bold text-[#5B5B66] uppercase tracking-wider block">Paragraphs</span>
          <span className="text-2xl font-extrabold text-[#0B0B0F] tabular-nums">{stats.paragraphs.toLocaleString('en-IN')}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#FAFAF9] border border-[#E7E7E4] text-center">
          <span className="text-[11px] font-bold text-[#5B5B66] uppercase tracking-wider block">Lines</span>
          <span className="text-2xl font-extrabold text-[#0B0B0F] tabular-nums">{stats.lines.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Reading & Speaking Times */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#E7E7E4] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-[#5B5B66] block">Reading Time (200 WPM)</span>
            <span className="text-base font-bold text-[#0B0B0F]">
              ~{stats.readingTimeMinutes} min {stats.words > 0 && stats.readingTimeMinutes < 1 ? '(< 1 min)' : ''}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E7E7E4] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-[#5B5B66] block">Speaking Time (130 WPM)</span>
            <span className="text-base font-bold text-[#0B0B0F]">
              ~{stats.speakingTimeMinutes} min
            </span>
          </div>
        </div>
      </div>

      {/* Keyword Density Table */}
      {stats.topKeywords.length > 0 && (
        <div className="border border-[#E7E7E4] rounded-2xl p-4 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#0B0B0F] uppercase tracking-wider">
              Top Keywords & Density
            </h4>
            <label className="inline-flex items-center gap-2 text-xs font-semibold text-[#5B5B66] cursor-pointer">
              <input
                type="checkbox"
                checked={filterStopWords}
                onChange={(e) => setFilterStopWords(e.target.checked)}
                className="w-3.5 h-3.5 text-[#4F46E5] rounded"
              />
              <span>Filter common stop words</span>
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
            {stats.topKeywords.map((kw) => (
              <div
                key={kw.word}
                className="p-2 rounded-lg bg-[#FAFAF9] border border-[#E7E7E4] text-xs flex justify-between items-center"
              >
                <span className="font-semibold text-[#0B0B0F] truncate">{kw.word}</span>
                <span className="text-[#5B5B66] tabular-nums shrink-0 ml-1">
                  {kw.count} ({kw.density}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

