# 03 — Architecture

## Folder structure
```
src/
├── app/
│   ├── layout.tsx                 # fonts, metadata base, header/footer
│   ├── page.tsx                   # homepage (Server Component)
│   ├── tools/page.tsx             # all tools
│   ├── tools/[slug]/page.tsx      # generateStaticParams + generateMetadata
│   ├── category/[category]/page.tsx
│   ├── (legal)/{about,contact,privacy-policy,terms,disclaimer}/page.tsx
│   ├── sitemap.ts  robots.ts  opengraph-image.tsx  not-found.tsx
├── components/
│   ├── layout/   Header Footer Breadcrumbs
│   ├── tools/    ToolCard ToolSearch ToolLayout RelatedTools ToolFAQ
│   ├── inputs/   FileUploader NumberField SelectField TextAreaField
│   ├── feedback/ ErrorAlert ProgressBar ResultPanel CopyButton DownloadButton
│   ├── ads/      AdSlot
│   └── ui/       Button Chip Card Accordion Dialog
├── config/
│   ├── tools.ts                   # THE registry
│   ├── categories.ts
│   └── site.ts                    # name, url, description
├── features/                      # client widgets, one folder per tool
│   └── image-compressor/ImageCompressorTool.tsx  (+ worker.ts)
├── lib/
│   ├── tools/                     # pure logic, no React, unit tested
│   │   ├── emi.ts  sip.ts  gst.ts  percentage.ts  age.ts  wordcount.ts
│   │   ├── json.ts  units.ts  qr.ts  image.ts  pdf.ts
│   ├── workers/                   # worker entrypoints + typed message helpers
│   ├── format.ts                  # en-IN number/currency, bytes, dates
│   ├── seo.ts                     # metadata + JSON-LD builders
│   └── search.ts                  # lightweight fuzzy search over registry
├── content/                       # per-tool long-form copy, FAQs (typed objects or MDX)
└── tests/                         # vitest unit + playwright e2e
```

## Registry type
```ts
export type ToolCategory = 'image' | 'pdf' | 'finance' | 'text-dev' | 'converters' | 'date-time';

export interface ToolDefinition {
  slug: string;                    // kebab-case, immutable once published
  name: string;
  shortDescription: string;        // ≤ 110 chars, used on cards
  seoTitle: string;                // ≤ 60 chars, unique
  seoDescription: string;          // 140–160 chars, unique
  category: ToolCategory;
  tags: string[];
  keywords: string[];
  icon: LucideIconName;
  popular: boolean;
  addedAt: string;                 // ISO date → "Recently added"
  relatedSlugs: string[];
  processing: 'local-js' | 'worker';
  component: () => Promise<{ default: React.ComponentType }>;  // dynamic import of widget
  content: { howTo: string[]; about: string; faqs: { q: string; a: string }[] };
}
```
Validation script (`scripts/validate-registry.ts`, run in CI): unique slugs, unique titles/descriptions, length limits, related slugs exist, every tool has ≥5 FAQs and ≥400 words content.

## Rendering strategy
- Pages are statically generated (`generateStaticParams`). Page shell = Server Component; only the tool widget is a client component loaded via `next/dynamic` with a skeleton fallback (`ssr: false` only for tools needing browser APIs).
- Libraries imported inside event handlers with `await import()`.
- Fonts via `next/font` (no layout shift). No external font CSS.
- Images: `next/image`; prefer inline SVG/CSS for decoration.

## Worker pattern
```ts
// lib/workers/client.ts — typed request/response, cancellation, progress
runInWorker<TIn, TOut>(workerFactory, payload, { onProgress, signal })
```
- Transfer `ArrayBuffer`s (don't copy).
- Always terminate worker on unmount/cancel.
- Fallback to main thread with a warning for browsers lacking support (rare).

## File handling rules
- Validate MIME **and** extension **and** magic bytes for PDFs/images.
- Default max: 50 MB per file, 20 files per batch (configurable constant). Warn > 25 MB.
- Use `URL.createObjectURL`; always `revokeObjectURL` on cleanup.
- Never read entire large files into strings. Never log file contents.
- Handle: corrupt files, password-protected PDFs (clear message), zero-byte files, huge dimensions (> 16k px → downscale guard), out-of-memory (try/catch with friendly error).

## State
Local component state / `useReducer`. No global store. Persist nothing sensitive; optional `localStorage` only for UI prefs (guard with try/catch).

## Error model
`type Result<T> = { ok: true; value: T } | { ok: false; error: string }` for all lib functions that can fail; UI renders `error` in `<ErrorAlert/>`.

## Testing
- **Vitest:** all `lib/tools/*` with known-answer tests (see 04).
- **Playwright:** one smoke test per tool (load → input → result visible), mobile + desktop viewports, assert zero console errors.
- **Registry validator** in CI.
