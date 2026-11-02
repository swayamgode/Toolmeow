import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ToolsPageClient } from '@/components/tools/ToolsPageClient';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'All Browser-Based Tools',
  description:
    'Browse all free online tools on ToolMeow. Every tool runs 100% locally in your browser — no file uploads, no accounts, and zero daily limits.',
  path: '/tools',
});

export default function ToolMeowPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9]">
      <Header />
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs items={[{ label: 'All Tools' }]} className="mb-6" />

        <div className="max-w-2xl mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B0B0F] tracking-tight mb-2">
            All Browser-Based Tools
          </h1>
          <p className="text-sm text-[#5B5B66]">
            Every tool runs 100% locally on your computer or phone. No file uploads, no accounts, and zero daily limits.
          </p>
        </div>

        <ToolsPageClient />
      </main>
      <Footer />
    </div>
  );
}
