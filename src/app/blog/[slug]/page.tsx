import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { BLOG_POSTS, getBlogPostBySlug } from '@/config/blogs';
import { TOOLS } from '@/config/tools';
import { CATEGORIES } from '@/config/categories';
import { constructMetadata, buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { Clock, Calendar, ArrowRight, Wrench, ShieldCheck } from 'lucide-react';
import { parseMarkdown } from '@/lib/tools/markdown';

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    ...constructMetadata({
      title: post.seoTitle,
      description: post.seoDescription,
      path: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
    }),
    keywords: post.keywords,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const tool = TOOLS.find((t) => t.slug === post.toolSlug);
  const category = CATEGORIES[post.category];

  const articleJsonLd = buildArticleJsonLd({
    title: post.title,
    description: post.seoDescription,
    url: `${siteConfig.url}/blog/${post.slug}`,
    publishedAt: post.publishedAt,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: siteConfig.url },
    { name: 'Blog', url: `${siteConfig.url}/blog` },
    { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
  ]);

  const htmlContent = parseMarkdown(post.content);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main className="flex-1 max-w-[840px] mx-auto px-4 sm:px-6 py-8 w-full">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: category?.name || 'Guide', href: `/category/${post.category}` },
            { label: post.title },
          ]}
          className="mb-6"
        />

        <article>
          {/* Article Header */}
          <header className="mb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#5B5B66]">
              <span className="px-3 py-1 rounded-full bg-[#EEF0FF] text-[#4F46E5] font-bold">
                {category?.name || post.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Updated {post.publishedAt}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B0B0F] tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="text-base text-[#5B5B66] leading-relaxed">
              {post.seoDescription}
            </p>
          </header>

          {/* Interactive Tool Callout Card */}
          {tool && (
            <aside aria-label="Interactive Tool" className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#4F46E5]/10 via-[#EEF0FF] to-white border border-[#4F46E5]/30 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
                    Interactive Browser Tool
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" />
                    100% Client-Side
                  </span>
                </div>
                <h2 className="text-base font-bold text-[#0B0B0F]">
                  Try {tool.name} Now
                </h2>
                <p className="text-xs text-[#5B5B66]">
                  {tool.shortDescription}
                </p>
              </div>
              <Link
                href={`/tools/${tool.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4F46E5] text-white text-xs font-bold hover:bg-[#4338CA] transition-colors shrink-0 shadow-sm"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Open Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </aside>
          )}

          {/* Article Body */}
          <div
            className="prose prose-slate max-w-none text-[#0B0B0F] leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <div className="my-10">
            <AdSlot slot="inContent" />
          </div>

          {/* Bottom Tool CTA */}
          {tool && (
            <div className="mt-12 p-8 rounded-2xl bg-white border border-[#E7E7E4] text-center space-y-4 shadow-card">
              <h3 className="text-xl font-bold text-[#0B0B0F]">
                Ready to calculate or convert?
              </h3>
              <p className="text-xs sm:text-sm text-[#5B5B66] max-w-md mx-auto">
                Use our zero-install, private {tool.name.toLowerCase()} directly inside your browser. No registration required.
              </p>
              <div>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B0B0F] text-white text-xs sm:text-sm font-semibold hover:bg-[#1E1E24] shadow-btn transition-transform active:scale-95"
                >
                  <span>Launch {tool.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}

