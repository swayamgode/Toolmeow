'use client';

import React, { useState, useMemo } from 'react';
import { ToolCard } from '@/components/tools/ToolCard';
import { TOOLS } from '@/config/tools';
import { CATEGORIES } from '@/config/categories';
import { Search } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';

export function ToolsPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = Object.values(CATEGORIES);

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        {/* Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#0B0B0F] text-white shadow-sm'
                : 'bg-white border border-[#E7E7E4] text-[#5B5B66] hover:bg-[#F4F4F2]'
            }`}
          >
            All Tools ({TOOLS.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.slug
                  ? 'bg-[#0B0B0F] text-white shadow-sm'
                  : 'bg-white border border-[#E7E7E4] text-[#5B5B66] hover:bg-[#F4F4F2]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-[#5B5B66] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by keyword..."
            className="w-full h-10 pl-9 pr-3 rounded-full border border-[#E7E7E4] bg-white text-xs font-medium text-[#0B0B0F] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          />
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-[24px] border border-[#E7E7E4] p-8">
          <p className="text-sm font-semibold text-[#0B0B0F]">No tools found</p>
          <p className="text-xs text-[#5B5B66] mt-1">
            Try adjusting your search keywords or selecting another category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}

      <AdSlot slot="footer" className="mt-12" />
    </>
  );
}
