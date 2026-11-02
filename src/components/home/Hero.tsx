import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { ToolSearch } from '@/components/tools/ToolSearch';
import { MiniToolPreview } from './MiniToolPreview';
import { siteConfig } from '@/config/site';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-6 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Outer rounded glass frame container */}
      <div className="max-w-[1200px] mx-auto hero-gradient rounded-[28px] sm:rounded-[36px] border border-white/60 p-6 sm:p-12 md:p-16 relative shadow-xl overflow-hidden text-center">
        {/* Subtle decorative grid lines (desktop only) */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Top Trust Badge */}
        <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-white/80 shadow-sm text-xs font-semibold text-[#0B0B0F] mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
          <span>Zero-Upload Guarantee &bull; 100% Private</span>
        </div>

        {/* Headline */}
        <h1 className="relative text-4xl sm:text-6xl md:text-[76px] font-extrabold text-[#0B0B0F] tracking-[-0.04em] leading-[1.03] max-w-4xl mx-auto mb-6">
          Fast, private tools.
          <br />
          <span className="text-[#4F46E5]">Zero server uploads.</span>
        </h1>

        {/* Subline */}
        <p className="relative text-base sm:text-lg md:text-xl text-[#5B5B66] max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
          Compress images, merge PDFs, calculate EMIs, generate QR codes, and convert units.
          Every single byte is processed locally in your browser.
        </p>

        {/* Hero Interactive Search Bar */}
        <div className="relative max-w-lg mx-auto mb-8 shadow-sm">
          <ToolSearch placeholder="Search any tool (e.g. EMI, PDF, Image Compressor)..." />
        </div>

        {/* Hero Action Buttons */}
        <div className="relative flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0B0B0F] text-white text-sm font-bold shadow-btn hover:bg-[#1E1E24] transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>Browse All Tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#popular"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/90 text-[#0B0B0F] text-sm font-semibold border border-[#E7E7E4] shadow-sm hover:bg-white transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>Popular Tools</span>
          </a>
        </div>

        {/* Trust Chips */}
        <div className="relative flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-[#0B0B0F]/80 mb-12">
          {siteConfig.trustChips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 border border-white/60 backdrop-blur-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
              {chip}
            </span>
          ))}
        </div>

        {/* Overlapping Product Preview (Mini-tool peek) */}
        <div className="relative -mb-12 sm:-mb-20 pt-4">
          <MiniToolPreview />
        </div>
      </div>
    </section>
  );
};

