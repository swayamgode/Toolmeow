import React from 'react';
import type { ToolDefinition } from '@/config/tools';
import { ToolCard } from './ToolCard';

export interface RelatedToolsProps {
  tools: ToolDefinition[];
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ tools }) => {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="py-12 border-t border-[#E7E7E4]">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B0B0F] tracking-tight">
          Related Tools You Might Find Useful
        </h2>
        <p className="text-xs text-[#5B5B66] mt-1">
          Explore more browser-native utilities in this category.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
};

