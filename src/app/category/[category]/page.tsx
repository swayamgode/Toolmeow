import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ToolCard } from '@/components/tools/ToolCard';
import { AdSlot } from '@/components/ads/AdSlot';
import { TOOLS } from '@/config/tools';
import { CATEGORIES, type ToolCategory } from '@/config/categories';
import { constructMetadata, buildBreadcrumbJsonLd } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ category: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES[category as ToolCategory];
  if (!cat) return {};

  return constructMetadata({
    title: `${cat.name} — Free Online Tools`,
    description: cat.description,
    path: `/category/${cat.slug}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = CATEGORIES[category as ToolCategory];
  if (!cat) notFound();

  const tools = TOOLS.filter((t) => t.category === cat.slug && t.status === 'active');

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: siteConfig.url },
    { name: 'Tools', url: `${siteConfig.url}/tools` },
    { name: cat.name, url: `${siteConfig.url}/category/${cat.slug}` },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: cat.name },
          ]}
          className="mb-6"
        />

        <div className="max-w-2xl mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B0B0F] tracking-tight mb-2">
            {cat.name}
          </h1>
          <p className="text-sm text-[#5B5B66] leading-relaxed">{cat.description}</p>
        </div>

        <AdSlot slot="inContent" className="mb-8" />

        {tools.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-[24px] border border-[#E7E7E4] p-8">
            <p className="text-sm font-semibold text-[#0B0B0F]">No tools in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        )}

        <AdSlot slot="footer" className="mt-12" />
      </main>
      <Footer />
    </div>
  );
}
