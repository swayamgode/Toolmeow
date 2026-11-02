# 05 — SEO, AdSense & Legal

## SEO implementation
- `generateMetadata` on every route: unique `title` (≤ 60), `description` (140–160), canonical (`metadataBase` + path), OpenGraph (type, title, description, url, image), Twitter card.
- Dynamic OG image per tool via `opengraph-image.tsx` (name + icon on brand gradient).
- `sitemap.ts` generated from registry + categories + legal pages with `lastModified`. `robots.ts` allows all, points to sitemap, disallows nothing important.
- JSON-LD: `WebSite` + `SearchAction` (home), `SoftwareApplication` (`applicationCategory`, `offers.price=0`, `operatingSystem=Any`) + `FAQPage` + `BreadcrumbList` (tool pages). Validate with Rich Results Test.
- Semantic HTML: one `<h1>`, `<main>`, `<nav aria-label>`, `<article>`, `<section>` with headings. Descriptive link text.
- Internal linking: related tools, category hubs, footer links, breadcrumb, "Popular" blocks. No orphan pages.
- Performance: static generation, tool code split, no layout shift (reserve ad + skeleton heights), `next/font`, preconnect only to needed origins, JS budget < 120KB gzip on homepage.
- URL design: short, stable slugs (`/tools/emi-calculator`). Redirect trailing-slash variants consistently.

## Avoiding "thin content" (critical for AdSense approval)
AdSense frequently rejects tool sites for "low value content". Each tool page needs:
- ≥ 400 words of original explanation (what it is, how it works, formulas, examples, limitations).
- Worked examples and FAQs that answer real questions.
- Category hubs with ≥ 150 words of genuine intro copy.
Never generate near-duplicate pages (no "EMI calculator for 5 lakh / 10 lakh" spam). Expand with a few high-quality guides later (e.g. "How is EMI calculated?") only when genuinely useful.

## AdSense integration
- `AdSlot` props: `slot: 'inContent' | 'footer' | 'sidebar'`, reserves `min-height`, renders label "Advertisement", wrapper `aria-label="Advertisement"`.
- Until approved: render **nothing visible** or a neutral dev-only dashed box (only when `NODE_ENV !== 'production'`). Never fake ads in production.
- After approval: load `adsbygoogle.js` once with `next/script` `strategy="afterInteractive"`, publisher ID from `NEXT_PUBLIC_ADSENSE_CLIENT`. Add `public/ads.txt` (`google.com, pub-XXXX, DIRECT, f08c47fec0942fa0`).
- Placement rules: ≥ 32px from any button, input, slider, file dropzone or download link. Never above the tool interface on mobile. Never inside modals. Max 3 slots per page. No sticky ad overlaying controls. No ad "styled like" a tool result.
- Consent: document wiring a Google-certified CMP (Funding Choices) for EEA/UK/CH; do not invent a custom consent mechanism that claims compliance.

## Legal pages (real content, not lorem)
- **Privacy Policy:** what is/isn't collected; files processed locally; cookies & Google AdSense/DoubleClick cookies; link to Google's ad-settings and opt-out; analytics (if any); children; contact; last-updated date.
- **Terms of Use:** as-is service, acceptable use, IP, limitation of liability, governing law placeholder.
- **Disclaimer:** calculators are informational — not financial/tax/legal advice; verify GST rates/EMI with lenders/official sources; file tools provided without warranty — keep backups.
- **About:** who runs it, mission, why free, how it's funded (ads).
- **Contact:** a real email address (env-configured) — a mailto link and simple instructions. No fake form that goes nowhere; if a form is used, use a real provider.
- Footer links to all pages on every route.

## Privacy claims — be accurate
Only state "processed locally" for tools where that's literally true (all 15 launch tools). Add a build-time test grepping client bundles for `fetch(`/`XMLHttpRequest` to unknown origins inside tool code. Third-party ad scripts do load network requests — say so honestly in the Privacy Policy.
