import React from 'react';
import Link from 'next/link';
import type { ToolDefinition } from '@/config/tools';
import { ToolIcon } from './ToolIcon';
import { Chip } from '@/components/ui/Chip';

export interface ToolCardProps {
  tool: ToolDefinition;
  className?: string;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, className = '' }) => {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={`group relative flex flex-col justify-between bg-white border border-[#E7E7E4] rounded-[20px] p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-[#4F46E5]/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#EEF0FF] flex items-center justify-center text-[#4F46E5] group-hover:scale-105 transition-transform">
            <ToolIcon name={tool.icon} className="w-5 h-5" />
          </div>
          {tool.popular && (
            <Chip variant="accent" size="sm">
              Popular
            </Chip>
          )}
        </div>

        <h3 className="text-base font-bold text-[#0B0B0F] group-hover:text-[#4F46E5] transition-colors mb-1.5">
          {tool.name}
        </h3>
        <p className="text-xs leading-relaxed text-[#5B5B66] line-clamp-2 mb-4">
          {tool.shortDescription}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#F4F4F2]">
        {tool.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#F4F4F2] text-[#5B5B66]"
          >
            {tag}
          </span>
        ))}
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#16A34A] ml-auto">
          Local
        </span>
      </div>
    </Link>
  );
};

