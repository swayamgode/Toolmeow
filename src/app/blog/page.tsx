import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BLOG_POSTS } from '@/config/blogs';
import { constructMetadata } from '@/lib/seo';
import { BookOpen, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '@/config/categories';

export const metadata: Metadata = constructMetadata({
  title: 'Guides & Blog - ToolMeow Tutorials & Explanations',
  description:
    'Comprehensive technical guides, tutorials, and practical explanations for all browser-based calculators, converters, and developer utilities.',
  path: '/blog',
});

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9]">
      <Header />
      <main className="flex-1 max-w-[1100px] mx-auto px-4 sm:px-6 py-10 w-full">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF0FF] text-[#4F46E5] text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guides & Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B0B0F] tracking-tight mb-4">
            In-Depth Guides & Tutorials
          </h1>
          <p className="text-base text-[#5B5B66] leading-relaxed">
            Master each browser utility with worked examples, mathematical formulas, and privacy-first security best practices.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => {
            const category = CATEGORIES[post.category];
            return (
              <article
                key={post.slug}
                className="bg-white border border-[#E7E7E4] rounded-2xl p-6 flex flex-col justify-between hover:shadow-card hover:border-[#4F46E5]/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#F4F4F2] text-[#5B5B66] font-semibold">
                      {category?.name || post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[#5B5B66]">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-[#0B0B0F] group-hover:text-[#4F46E5] transition-colors leading-snug mb-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-[#5B5B66] line-clamp-3 leading-relaxed mb-4">
                    {post.seoDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E7E7E4]/70 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Client-Side</span>
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#4F46E5] group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}

