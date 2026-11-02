import React from 'react';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { POPULAR_TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/tools/ToolCard';

export const PopularToolsSection: React.FC = () => {
  return (
    <section id="popular" className="pt-20 pb-16 px-4 sm:px-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] uppercase tracking-wider mb-2">
            <Flame className="w-4 h-4 text-[#D97706]" />
            <span>Most Utilized</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B0B0F] tracking-tight">
            Popular Browser Tools
          </h2>
        </div>
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#4F46E5] hover:underline"
        >
          <span>View all 15 tools</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {POPULAR_TOOLS.slice(0, 8).map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
};

