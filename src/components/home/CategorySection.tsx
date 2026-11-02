import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/config/categories';
import { getToolsByCategory } from '@/config/tools';
import { ToolCard } from '@/components/tools/ToolCard';

export const CategorySection: React.FC = () => {
  const categoryList = Object.values(CATEGORIES);

  return (
    <section id="categories" className="py-16 px-4 sm:px-6 max-w-[1200px] mx-auto space-y-16">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B0B0F] tracking-tight mb-3">
          Explore by Category
        </h2>
        <p className="text-sm text-[#5B5B66]">
          Curated collections of client-side utilities engineered for developers, accountants, students, and creators.
        </p>
      </div>

      {categoryList.map((category) => {
        const tools = getToolsByCategory(category.slug);
        if (tools.length === 0) return null;

        return (
          <div key={category.slug} className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#E7E7E4] pb-4">
              <div>
                <h3 className="text-xl font-bold text-[#0B0B0F] flex items-center gap-2">
                  <span>{category.name}</span>
                </h3>
                <p className="text-xs text-[#5B5B66] mt-0.5">{category.tagline}</p>
              </div>
              <Link
                href={`/category/${category.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#4F46E5] hover:underline"
              >
                <span>Browse {category.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

