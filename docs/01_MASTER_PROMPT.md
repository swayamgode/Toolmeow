# 01 — Master Prompt: AllToolsHub

## Role
Act as a senior Next.js engineer, product designer, SEO architect and frontend performance specialist.

## Product
**AllToolsHub** — a fast, trustworthy, ad-supported (Google AdSense) collection of free browser-based tools.
Launch with 15 fully working tools; architecture must make adding tool #16–#50 a one-folder + one-registry-entry job.

**Primary audience:** India-first (INR, GST, en-IN number formatting) but globally usable.
**Positioning:** "Fast. Private. Free." Files never leave your device.
**Success metrics:** Lighthouse ≥ 95 (mobile) for Performance/Accessibility/SEO/Best Practices, LCP < 2.0s, CLS < 0.05, INP < 200ms.

## Stack (fixed)
Next.js (App Router, latest stable) · TypeScript strict · Tailwind CSS · React · lucide-react · Vercel.
No DB, no backend, no auth, no paid APIs. Route Handlers only for sitemap/robots/OG if needed.

## Design
Follow `02_DESIGN_SYSTEM.md`. Inspiration: the Selly landing page — soft pastel sky/lavender gradient hero in a rounded glass frame, huge tight-tracked bold headline, dark pill primary button + white secondary button, a real product-preview peeking from the bottom of the hero. Adapt it: the "product preview" is a live mini tool (e.g. a working QR or percentage calculator), not an image.

## Homepage
1. Sticky header: logo, nav (Tools, Categories, Blog-less → "About"), search trigger (`/` or `⌘K`), primary CTA.
2. Hero: headline, subline, **working search** with instant results, two buttons (Browse tools / Popular), trust chips ("No uploads · No signup · Free").
3. Hero preview card: an interactive mini-tool.
4. Popular tools grid (8).
5. Categories (Image · PDF · Finance · Text & Dev · Converters · Date & Time) each with 3–6 tool cards and "View all" link.
6. Recently added (driven by `addedAt` in registry).
7. "Why AllToolsHub" privacy/speed block.
8. SEO content section (300+ words, human-written, useful, not keyword stuffing).
9. Footer: categories, legal pages, contact, "Files are processed locally" note.

## Routes
```
/                         homepage
/tools                    all tools (filter + search)
/tools/[slug]             each tool page
/category/[category]      category hub with intro copy (≥150 words)
/about /contact /privacy-policy /terms /disclaimer
/sitemap.xml /robots.txt
```

## Tool page template (every tool)
1. Breadcrumb
2. H1 + one-line value prop + privacy badge ("Processed in your browser")
3. **Tool interface** (above the fold on mobile)
4. Results panel with copy/download
5. Ad slot A (below results, clearly labelled, ≥ 24px clear space from any control)
6. How to use (numbered steps)
7. About / explanation / formulas (original content, ≥ 400 words total)
8. FAQ (5–8 Qs, with FAQPage JSON-LD)
9. Related tools (3–6, by category/tags)
10. Ad slot B (footer-side, optional)

## Core components
Header · Footer · ToolCard · ToolSearch (command-palette style) · ToolLayout · FileUploader (drag/drop, paste, keyboard, size/type validation, multi-file) · ResultPanel · CopyButton · DownloadButton · ProgressBar · ErrorAlert · AdSlot · RelatedTools · Breadcrumbs · FAQ (accessible accordion) · CategoryChips.

## Central registry
Single source of truth: `src/config/tools.ts` (see 03_ARCHITECTURE.md). Homepage sections, category pages, search, sitemap, related tools, JSON-LD and metadata are ALL derived from it.

## Privacy
Prominent, truthful statement: files are processed locally in the browser and never uploaded. No analytics that capture file contents. Cookie/consent note appropriate for AdSense (consent banner placeholder for EEA/UK via a CMP — document how to wire Google's certified CMP; do not fake one).

## Quality bar
No dead buttons · no fake functionality · no unnecessary deps · no console errors · validated calculations (known-answer tests) · mobile-first · large-file safe (warn + chunk/worker) · minimal client JS.

## Output rules for the AI
- Work in the phases of `06_BUILD_PLAN_AND_QA.md`; stop after each one with a verification report.
- Show the file tree you created at the end of each phase.
- If a requirement is technically impossible in-browser (e.g. true lossless PDF compression of scanned PDFs), say so, implement the best honest approach, and explain the limitation in the UI.
