'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  CheckCircle2,
  Percent,
  ImageDown,
  Layers,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  FileCode,
} from 'lucide-react';

export const MiniToolPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'board' | 'list'>('board');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/90 backdrop-blur-xl rounded-[24px] sm:rounded-[32px] border border-white/80 mac-window-shadow overflow-hidden text-left transition-all">
      {/* 1. macOS Window Title Bar & Navigation Bar */}
      <div className="bg-[#FAF9FB]/90 px-4 sm:px-6 py-3.5 border-b border-[#E7E7E4]/80 flex flex-wrap items-center justify-between gap-3">
        {/* macOS Traffic Lights */}
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] inline-block shadow-xs" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] inline-block shadow-xs" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] inline-block shadow-xs" />
        </div>

        {/* Center Search Input */}
        <div className="flex-1 max-w-xs sm:max-w-md mx-2">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-[#5B5B66] absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for tools, calculators, tasks..."
              className="w-full h-8 pl-8 pr-10 text-xs bg-white rounded-lg border border-[#E7E7E4] text-[#0B0B0F] placeholder-[#5B5B66] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] shadow-xs"
            />
            <kbd className="absolute right-2 text-[10px] font-mono text-[#5B5B66] bg-[#F4F4F2] px-1.5 py-0.5 rounded border border-[#E7E7E4]/70">
              /
            </kbd>
          </div>
        </div>

        {/* Top Window Meta Badges */}
        <div className="hidden lg:flex items-center gap-3 text-xs font-medium text-[#5B5B66]">
          <span className="hover:text-[#0B0B0F] cursor-pointer">Calculators</span>
          <span className="hover:text-[#0B0B0F] cursor-pointer">Converters</span>
          <span className="hover:text-[#0B0B0F] cursor-pointer">Workflows</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#4F46E5] bg-[#EEF0FF] px-2.5 py-0.5 rounded-full">
            <ShieldCheck className="w-3 h-3 text-[#4F46E5]" />
            100% Client-Side
          </span>
        </div>
      </div>

      {/* 2. Window Body: Sidebar + Main Board */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
        {/* Left Sidebar */}
        <aside className="hidden md:block md:col-span-3 bg-[#FAF9FB]/60 border-r border-[#E7E7E4]/70 p-4 space-y-6 text-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B5B66] block mb-2 px-2">
              Workspace
            </span>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[#5B5B66] hover:bg-white hover:text-[#0B0B0F] transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Overview</span>
                </Link>
              </li>
              <li>
                <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white text-[#0B0B0F] font-bold shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>Active Tools</span>
                  </div>
                  <span className="text-[10px] bg-[#EEF0FF] text-[#4F46E5] font-extrabold px-1.5 py-0.2 rounded-full">
                    25
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B5B66] block mb-2 px-2">
              Categories
            </span>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/category/finance"
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[#5B5B66] hover:bg-white hover:text-[#0B0B0F] transition-colors"
                >
                  <Percent className="w-3.5 h-3.5 text-blue-500" />
                  <span>Finance & Math</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/category/image"
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[#5B5B66] hover:bg-white hover:text-[#0B0B0F] transition-colors"
                >
                  <ImageDown className="w-3.5 h-3.5 text-rose-500" />
                  <span>Images & Media</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/category/text-dev"
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[#5B5B66] hover:bg-white hover:text-[#0B0B0F] transition-colors"
                >
                  <FileCode className="w-3.5 h-3.5 text-purple-500" />
                  <span>Developer & Text</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[#E7E7E4]/70 px-2 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B5B66] block">
              Security Guarantee
            </span>
            <p className="text-[11px] text-[#5B5B66] leading-relaxed">
              Zero bytes transmitted. Operates directly in your browser memory.
            </p>
          </div>
        </aside>

        {/* Main Board Area */}
        <div className="col-span-1 md:col-span-9 p-4 sm:p-6 bg-white flex flex-col justify-between">
          <div>
            {/* Top Board Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-[#0B0B0F] tracking-tight">
                  Featured Utilities
                </h2>
                <p className="text-xs text-[#5B5B66]">
                  Instant access to our most popular high-performance tools
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-lg border border-[#E7E7E4] p-0.5 bg-[#FAF9FB] text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab('board')}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${
                      activeTab === 'board'
                        ? 'bg-white text-[#0B0B0F] shadow-xs'
                        : 'text-[#5B5B66] hover:text-[#0B0B0F]'
                    }`}
                  >
                    Board
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('list')}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${
                      activeTab === 'list'
                        ? 'bg-white text-[#0B0B0F] shadow-xs'
                        : 'text-[#5B5B66] hover:text-[#0B0B0F]'
                    }`}
                  >
                    All 25
                  </button>
                </div>

                <Link
                  href="/tools"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B0B0F] text-white text-xs font-bold hover:bg-[#1E1E24] shadow-xs transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Launch All</span>
                </Link>
              </div>
            </div>

            {/* 3 Status Columns (Matching the Selly Board screenshot) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Column 1: Daily Utilities */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#5B5B66] px-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Daily Calculators</span>
                  </span>
                  <span className="text-[11px] text-[#5B5B66]/70">01</span>
                </div>

                {/* Card 1 */}
                <Link
                  href="/tools/percentage-calculator"
                  className="block p-3.5 rounded-xl border border-[#E7E7E4] bg-white hover:border-[#4F46E5] hover:shadow-card transition-all group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      Finance
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-[#5B5B66] group-hover:text-[#4F46E5] transition-colors" />
                  </div>
                  <h3 className="text-xs font-bold text-[#0B0B0F] group-hover:text-[#4F46E5] mb-1">
                    Percentage Calculator
                  </h3>
                  <p className="text-[11px] text-[#5B5B66] line-clamp-2 leading-relaxed">
                    Percentages, % change, discounts, and ratio calculation.
                  </p>
                </Link>

                {/* Card 2 */}
                <Link
                  href="/tools/word-counter"
                  className="block p-3.5 rounded-xl border border-[#E7E7E4] bg-white hover:border-[#4F46E5] hover:shadow-card transition-all group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      Text
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-[#5B5B66] group-hover:text-[#4F46E5] transition-colors" />
                  </div>
                  <h3 className="text-xs font-bold text-[#0B0B0F] group-hover:text-[#4F46E5] mb-1">
                    Word Counter
                  </h3>
                  <p className="text-[11px] text-[#5B5B66] line-clamp-2 leading-relaxed">
                    Live word, character, and reading speed analytics.
                  </p>
                </Link>
              </div>

              {/* Column 2: Code & Security */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#5B5B66] px-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Code & Security</span>
                  </span>
                  <span className="text-[11px] text-[#5B5B66]/70">02</span>
                </div>

                {/* Card 1 */}
                <Link
                  href="/tools/password-generator"
                  className="block p-3.5 rounded-xl border border-[#E7E7E4] bg-white hover:border-[#4F46E5] hover:shadow-card transition-all group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      Security
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-[#5B5B66] group-hover:text-[#4F46E5] transition-colors" />
                  </div>
                  <h3 className="text-xs font-bold text-[#0B0B0F] group-hover:text-[#4F46E5] mb-1">
                    Password Generator
                  </h3>
                  <p className="text-[11px] text-[#5B5B66] line-clamp-2 leading-relaxed">
                    Cryptographic random passwords with live entropy score.
                  </p>
                </Link>

                {/* Card 2 */}
                <Link
                  href="/tools/json-formatter"
                  className="block p-3.5 rounded-xl border border-[#E7E7E4] bg-white hover:border-[#4F46E5] hover:shadow-card transition-all group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                      Developer
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-[#5B5B66] group-hover:text-[#4F46E5] transition-colors" />
                  </div>
                  <h3 className="text-xs font-bold text-[#0B0B0F] group-hover:text-[#4F46E5] mb-1">
                    JSON Formatter
                  </h3>
                  <p className="text-[11px] text-[#5B5B66] line-clamp-2 leading-relaxed">
                    Format, minify, and validate with exact line & col errors.
                  </p>
                </Link>
              </div>

              {/* Column 3: Media & Files */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#5B5B66] px-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Media & Files</span>
                  </span>
                  <span className="text-[11px] text-[#5B5B66]/70">03</span>
                </div>

                {/* Card 1 */}
                <Link
                  href="/tools/image-compressor"
                  className="block p-3.5 rounded-xl border border-[#E7E7E4] bg-white hover:border-[#4F46E5] hover:shadow-card transition-all group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                      Canvas Worker
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-[#5B5B66] group-hover:text-[#4F46E5] transition-colors" />
                  </div>
                  <h3 className="text-xs font-bold text-[#0B0B0F] group-hover:text-[#4F46E5] mb-1">
                    Image Compressor
                  </h3>
                  <p className="text-[11px] text-[#5B5B66] line-clamp-2 leading-relaxed">
                    Compress JPG, PNG & WebP offline with live quality preview.
                  </p>
                </Link>

                {/* Card 2 */}
                <Link
                  href="/tools/pdf-merger"
                  className="block p-3.5 rounded-xl border border-[#E7E7E4] bg-white hover:border-[#4F46E5] hover:shadow-card transition-all group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
                      PDF-Lib
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-[#5B5B66] group-hover:text-[#4F46E5] transition-colors" />
                  </div>
                  <h3 className="text-xs font-bold text-[#0B0B0F] group-hover:text-[#4F46E5] mb-1">
                    PDF Merger
                  </h3>
                  <p className="text-[11px] text-[#5B5B66] line-clamp-2 leading-relaxed">
                    Merge multiple PDFs with custom page reorder in browser.
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom subtle status bar */}
          <div className="mt-6 pt-4 border-t border-[#E7E7E4] flex flex-wrap items-center justify-between text-[11px] text-[#5B5B66]">
            <span className="flex items-center gap-1.5 font-medium text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All 25 modules loaded locally &bull; WebAssembly active
            </span>
            <Link
              href="/tools"
              className="font-bold text-[#4F46E5] hover:underline flex items-center gap-1"
            >
              <span>Explore full library</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
