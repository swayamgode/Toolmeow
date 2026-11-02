import React from 'react';
import Link from 'next/link';
import type { ToolDefinition } from '@/config/tools';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CATEGORIES } from '@/config/categories';
import { AdSlot } from '@/components/ads/AdSlot';
import { ToolFAQ } from './ToolFAQ';
import { RelatedTools } from './RelatedTools';
import { ShieldCheck, BookOpen, ArrowRight } from 'lucide-react';
import { ToolIcon } from './ToolIcon';

export interface ToolLayoutProps {
  tool: ToolDefinition;
  relatedTools: ToolDefinition[];
  children: React.ReactNode;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({
  tool,
  relatedTools,
  children,
}) => {
  const category = CATEGORIES[tool.category];

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-8">
      {/* 1. Breadcrumb */}
      <Breadcrumbs
        items={[
          { label: 'Tools', href: '/tools' },
          { label: category.name, href: `/category/${category.slug}` },
          { label: tool.name },
        ]}
        className="mb-6"
      />

      {/* 2. Header: H1 + one-line value prop + privacy badge */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center shrink-0 shadow-sm">
            <ToolIcon name={tool.icon} className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B0B0F] tracking-tight">
                {tool.name}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Runs in Browser</span>
              </span>
            </div>
            <p className="text-sm sm:text-base text-[#5B5B66] mt-1">
              {tool.shortDescription}
            </p>
          </div>
        </div>
      </header>

      {/* 3 & 4. Interactive Tool Interface & Results */}
      <main className="mb-10">
        <div className="bg-white border border-[#E7E7E4] rounded-[24px] p-5 sm:p-8 shadow-card">
          {children}
        </div>
      </main>

      {/* 5. Ad Slot A (Below results, >= 24px space from control) */}
      <div className="my-10">
        <AdSlot slot="inContent" />
      </div>

      {/* 6. How to use (Numbered steps) */}
      {tool.content.howTo && tool.content.howTo.length > 0 && (
        <section className="py-8 border-t border-[#E7E7E4]">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B0B0F] tracking-tight mb-6">
            How to Use the {tool.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tool.content.howTo.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-[#E7E7E4] flex items-start gap-3.5"
              >
                <div className="w-7 h-7 rounded-full bg-[#EEF0FF] text-[#4F46E5] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-[#5B5B66] leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. About / Explanation / Formulas */}
      <section className="py-8 border-t border-[#E7E7E4]">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B0B0F] tracking-tight mb-6">
          Understanding {tool.name}
        </h2>
        <div className="prose prose-sm max-w-none text-sm text-[#5B5B66] leading-relaxed space-y-4 whitespace-pre-line">
          {tool.content.about}
        </div>
      </section>

      {/* 8. FAQ */}
      <ToolFAQ faqs={tool.content.faqs} toolName={tool.name} />

      {/* Dedicated In-Depth Guide Banner */}
      <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-[#EEF0FF] via-white to-[#EEF0FF] border border-[#4F46E5]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Comprehensive Tutorial & Guide</span>
          </div>
          <h3 className="text-base font-bold text-[#0B0B0F]">
            Want a deeper look at {tool.name}?
          </h3>
          <p className="text-xs text-[#5B5B66]">
            Read our full tutorial with mathematical formulas, practical examples, and security details.
          </p>
        </div>
        <Link
          href={`/blog/${tool.slug}-guide`}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E7E7E4] hover:border-[#4F46E5] hover:text-[#4F46E5] text-xs font-bold text-[#0B0B0F] shadow-xs transition-colors shrink-0"
        >
          <span>Read Full Guide</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 9. Related Tools */}
      <RelatedTools tools={relatedTools} />

      {/* 10. Ad Slot B */}
      <div className="mt-8">
        <AdSlot slot="footer" />
      </div>
    </div>
  );
};

