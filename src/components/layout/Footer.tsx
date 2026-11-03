import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, Lock } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { CATEGORIES } from '@/config/categories';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-[#E7E7E4] bg-white text-[#5B5B66]">
      {/* Privacy Guarantee Ribbon */}
      <div className="border-b border-[#F4F4F2] bg-[#FAFAF9]/60 py-6">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-[#0B0B0F]">100% Client-Side</p>
              <p>Your files never leave your device or reach any server.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-[#0B0B0F]">Instant Execution</p>
              <p>Zero upload delay. Powered by modern WebAssembly and Workers.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-[#0B0B0F]">No Signups or Paywalls</p>
              <p>Completely free, open access tools with no subscriptions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 text-xs">
        {/* Brand Column */}
        <div className="col-span-2 space-y-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-base text-[#0B0B0F] group"
          >
            <div className="w-7 h-7 rounded-md overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon.svg" alt="ToolMeow Logo" width={28} height={28} className="w-full h-full object-contain" />
            </div>
            <span>{siteConfig.name}</span>
          </Link>
          <p className="leading-relaxed text-[#5B5B66] max-w-sm">
            {siteConfig.description} Designed for high speed, absolute confidentiality, and effortless everyday utility.
          </p>
          <p className="text-[11px] text-[#5B5B66]/80">
            Files and inputs are processed locally in your web browser. No telemetry or server storage touches your data.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#0B0B0F] uppercase tracking-wider text-[11px]">
            Categories
          </h4>
          <ul className="space-y-2">
            {Object.values(CATEGORIES).map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="hover:text-[#0B0B0F] transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#0B0B0F] uppercase tracking-wider text-[11px]">
            Legal & Trust
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy-policy" className="hover:text-[#0B0B0F] transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[#0B0B0F] transition-colors">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-[#0B0B0F] transition-colors">
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>

        {/* Company / Contact */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#0B0B0F] uppercase tracking-wider text-[11px]">
            Resources
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/blog" className="hover:text-[#0B0B0F] transition-colors">
                Guides & Blog
              </Link>
            </li>
            <li>
              <Link href="/tools" className="hover:text-[#0B0B0F] transition-colors">
                All 25 Tools
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#0B0B0F] transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#0B0B0F] transition-colors">
                Contact & Feedback
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-[#E7E7E4] py-6 text-center text-[11px] text-[#5B5B66]">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 {siteConfig.name}. All rights reserved.</span>
          <span>Crafted for privacy &bull; Files processed locally in browser</span>
        </div>
      </div>
    </footer>
  );
};

