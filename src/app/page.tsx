import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { PopularToolsSection } from '@/components/home/PopularToolsSection';
import { CategorySection } from '@/components/home/CategorySection';
import { RecentlyAddedSection } from '@/components/home/RecentlyAddedSection';
import { WhyToolMeow } from '@/components/home/WhyToolMeow';
import { HomeSeoContent } from '@/components/home/HomeSeoContent';
import { AdSlot } from '@/components/ads/AdSlot';
import { buildWebsiteJsonLd, constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Free Browser Tools — Fast, Private, Zero Uploads',
  description:
    'Free online tools for image compression, PDF merging, loan EMI calculation, GST, QR code generation, unit conversions, and JSON formatting. 100% private in-browser execution.',
  path: '/',
});

export default function HomePage() {
  const jsonLd = buildWebsiteJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen flex flex-col bg-[#FAFAF9]">
        <Header />
        <main className="flex-1">
          <Hero />
          <PopularToolsSection />
          <AdSlot slot="inContent" className="max-w-[1200px] mx-auto px-4" />
          <CategorySection />
          <RecentlyAddedSection />
          <WhyToolMeow />
          <HomeSeoContent />
          <AdSlot slot="footer" className="max-w-[1200px] mx-auto px-4" />
        </main>
        <Footer />
      </div>
    </>
  );
}
