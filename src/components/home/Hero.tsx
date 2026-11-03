import React from 'react';
import Link from 'next/link';
import { Sparkles, Layers, ArrowRight } from 'lucide-react';
import { MiniToolPreview } from './MiniToolPreview';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-6 pb-20 px-3 sm:px-6 overflow-hidden selly-cloud-canvas">
      {/* 1. Ethereal Cloud Blobs for organic watercolor billow look */}
      <div className="cloud-blob-left" aria-hidden="true" />
      <div className="cloud-blob-right" aria-hidden="true" />

      {/* 2. Architectural Frame Container with subtle hairline lines */}
      <div className="max-w-[1240px] mx-auto relative z-10 pt-4 sm:pt-10 pb-8 text-center">
        {/* Subtle decorative architectural crosshair grid lines */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '120px 120px',
          }}
        />

        {/* Framing border box */}
        <div className="relative rounded-[32px] sm:rounded-[44px] border border-white/60 p-4 sm:p-10 md:p-12 overflow-hidden">
          {/* Top Pill / Badge */}
          <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-white/90 shadow-sm text-xs font-semibold text-[#0B0B0F] mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>Zero Server Uploads &bull; 100% Client-Side Privacy</span>
          </div>

          {/* Main Headline (Identical typography style to the Selly reference image) */}
          <h1 className="relative text-4xl sm:text-6xl md:text-[72px] lg:text-[78px] font-extrabold text-[#0B0B0F] tracking-[-0.035em] leading-[1.08] max-w-4xl mx-auto mb-6">
            Maximize Your Day,
            <br />
            <span className="text-[#0B0B0F]">Minimize Distractions</span>
          </h1>

          {/* Subtitle */}
          <p className="relative text-base sm:text-lg md:text-xl text-[#5B5B66] max-w-2xl mx-auto mb-9 leading-relaxed font-normal">
            ToolMeow empowers you to take control of your time with seamless, zero-upload browser tools, helping you stay focused, private, and productive.
          </p>

          {/* Two CTA Buttons (Identical to reference screenshot) */}
          <div className="relative flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16">
            {/* Primary Dark Pill Button */}
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#111116] text-white text-sm font-bold shadow-selly-dark hover:bg-[#202028] transition-all hover:scale-[1.02] active:scale-95"
            >
              <Layers className="w-4 h-4 text-white" />
              <span>Browse 25+ Tools</span>
            </Link>

            {/* Secondary Light Pill Button */}
            <a
              href="#popular"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/95 text-[#111116] text-sm font-bold border border-white/90 shadow-selly-light hover:bg-white transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>Explore Popular</span>
              <ArrowRight className="w-4 h-4 text-[#5B5B66]" />
            </a>
          </div>

          {/* Emergent macOS App Preview Mockup Window */}
          <div className="relative -mb-10 sm:-mb-16 pt-2">
            <MiniToolPreview />
          </div>
        </div>
      </div>
    </section>
  );
};
