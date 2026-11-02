import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { ToolRenderer } from '@/components/tools/ToolRenderer';
import { TOOLS } from '@/config/tools';
import { constructMetadata, buildToolJsonLd, buildFaqJsonLd, buildBreadcrumbJsonLd } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { CATEGORIES } from '@/config/categories';

export function generateStaticParams() {
  return TOOLS.filter((t) => t.status === 'active').map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) return {};

  return {
    ...constructMetadata({
      title: tool.seoTitle,
      description: tool.seoDescription,
      path: `/tools/${tool.slug}`,
    }),
    keywords: tool.keywords,
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool || tool.status !== 'active') notFound();

  const relatedTools = TOOLS.filter((t) => tool.relatedSlugs.includes(t.slug));
  const category = CATEGORIES[tool.category];

  const softwareJsonLd = buildToolJsonLd(tool);
  const faqJsonLd = buildFaqJsonLd(tool.content.faqs);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: siteConfig.url },
    { name: 'Tools', url: `${siteConfig.url}/tools` },
    { name: category.name, url: `${siteConfig.url}/category/${category.slug}` },
    { name: tool.name, url: `${siteConfig.url}/tools/${tool.slug}` },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <ToolLayout tool={tool} relatedTools={relatedTools}>
          <ToolRenderer slug={slug} />
        </ToolLayout>
      </main>
      <Footer />
    </div>
  );
}
