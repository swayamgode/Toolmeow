'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { ToolSearch } from '@/components/tools/ToolSearch';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/40 bg-white/40 backdrop-blur-md">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-extrabold text-xl text-[#0B0B0F] hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-lg tracking-tight group"
          aria-label={`${siteConfig.name} Home`}
        >
          <div className="w-8 h-8 rounded-lg shadow-sm overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon.svg" alt="ToolMeow Logo" width={32} height={32} className="w-full h-full object-contain" />
          </div>
          <span>
            {siteConfig.name}<span className="text-[#4F46E5]">.</span>
          </span>
        </Link>

        {/* Center Search Bar (Desktop) */}
        <div className="hidden md:block flex-1 max-w-sm mx-4">
          <ToolSearch placeholder="Search 25+ browser tools..." />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] font-semibold text-[#5B5B66]" aria-label="Main navigation">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[#0B0B0F] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#111116] text-white text-xs font-bold hover:bg-[#222228] shadow-selly-dark transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>All Tools</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#0B0B0F] hover:bg-[#F4F4F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E7E7E4] bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-150">
          <div className="pt-1 pb-2">
            <ToolSearch placeholder="Search tools..." />
          </div>
          <nav className="flex flex-col space-y-3 text-sm font-medium text-[#0B0B0F]">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#F4F4F2] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0B0B0F] text-white text-sm font-semibold shadow-btn"
            >
              <span>Explore All Tools</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

