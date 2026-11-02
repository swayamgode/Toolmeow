import React from 'react';
import { Clock } from 'lucide-react';
import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/tools/ToolCard';

export const RecentlyAddedSection: React.FC = () => {
  const recentTools = [...TOOLS]
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, 4);

  return (
    <section className="py-16 px-4 sm:px-6 max-w-[1200px] mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <Clock className="w-5 h-5 text-[#4F46E5]" />
        <h2 className="text-2xl font-extrabold text-[#0B0B0F] tracking-tight">
          Recently Added Tools
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {recentTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
};

