import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { TOOLS } from '@/config/tools';
import { CATEGORIES } from '@/config/categories';
import { BLOG_POSTS } from '@/config/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const toolPages: MetadataRoute.Sitemap = TOOLS.filter((t) => t.status === 'active').map((t) => ({
    url: `${base}/tools/${t.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...BLOG_POSTS.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  const categoryPages: MetadataRoute.Sitemap = Object.keys(CATEGORIES).map((slug) => ({
    url: `${base}/category/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const legalPages: MetadataRoute.Sitemap = ['about', 'contact', 'privacy-policy', 'terms', 'disclaimer'].map(
    (slug) => ({
      url: `${base}/${slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    }),
  );

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    ...toolPages,
    ...blogPages,
    ...categoryPages,
    ...legalPages,
  ];
}
