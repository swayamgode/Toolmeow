# 06 — Build Plan & QA

Stop after each phase. Run `pnpm lint && pnpm typecheck && pnpm test && pnpm build`. Report results + file tree.

## Phase 0 — Foundation
- `pnpm create next-app` (TS, Tailwind, App Router, ESLint, src dir). Strict TS. Prettier. Vitest, Playwright.
- Add `config/site.ts`, `config/categories.ts`, empty typed `config/tools.ts`, `lib/format.ts`, `lib/seo.ts`.
- Scripts: `lint`, `typecheck`, `test`, `e2e`, `validate:registry`. CI workflow (GitHub Actions).
- **Exit:** blank app builds; CI green.

## Phase 1 — Design system + Homepage
- Tokens, fonts, Button/Chip/Card/Accordion/Dialog, Header (mobile menu), Footer, Breadcrumbs, ToolCard, ToolSearch (`/` and ⌘K), AdSlot, ToolLayout skeleton.
- Homepage per 01_MASTER_PROMPT incl. gradient glass hero + live mini preview.
- Seed registry with all 15 tools' metadata (components may not exist yet — mark `status: 'building'` and **exclude from production listings** until implemented).
- **Exit:** Lighthouse ≥ 95 mobile on `/`; keyboard + screen-reader pass on header/search.

## Phase 2 — Pure-logic tools (fast wins)
Percentage, GST, EMI, SIP, Age, Word Counter, JSON Formatter, Unit Converter. Logic + tests first, then UI.
- **Exit:** all known-answer tests pass; each tool page complete (content, FAQ, related, JSON-LD).

## Phase 3 — Image tools
FileUploader, worker client, Image Compressor, Resizer, Format Converter, QR Generator.
- **Exit:** tested with 20 MB image, EXIF-rotated phone photo, transparent PNG, corrupt file, 0-byte file.

## Phase 4 — PDF tools
PDF Merger → JPG to PDF → PDF Compressor.
- **Exit:** tested with 100-page PDF, encrypted PDF, scanned PDF, mixed-orientation images; memory stays stable; cancel works.

## Phase 5 — SEO, legal, ads
Sitemap, robots, OG images, JSON-LD, legal pages, category hubs, `ads.txt` template, consent notes, content audit (word counts, uniqueness).
- **Exit:** registry validator passes; Rich Results Test clean; no duplicate titles.

## Phase 6 — Hardening & deploy
- Playwright smoke for all 15 tools (mobile 390×844 + desktop 1440×900), zero console errors.
- axe-core scan on every page type (0 serious/critical).
- Bundle analysis; remove unused deps.
- Vercel: env vars (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ADSENSE_CLIENT`, `NEXT_PUBLIC_CONTACT_EMAIL`), security headers (CSP report-only first, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`), custom domain, Search Console + sitemap submit.
- Write `DEPLOY.md` with exact steps.

## Manual QA checklist (per tool)
- [ ] Works with keyboard only
- [ ] 360px width: no horizontal scroll, controls ≥ 44px
- [ ] Empty / invalid / extreme inputs show clear messages
- [ ] Loading + cancel for async work
- [ ] Copy/download produce correct output (open the file to verify)
- [ ] Results match independent calculation (spreadsheet/known tools)
- [ ] No network request carries user data (DevTools → Network)
- [ ] No console errors/warnings
- [ ] Title, description, canonical, OG unique and correct
- [ ] Related tools links resolve

## Roadmap after launch (tools 16–50, add in batches of 5)
Image: crop, rotate/flip, background-remover (only if fully local & honest), image to Base64, favicon generator, color picker.
PDF: split, rotate, extract pages, PDF to JPG, watermark.
Text/Dev: case converter, lorem ipsum, diff checker, Base64, URL encode/decode, UUID, password generator, hash generator, regex tester, markdown preview, text-to-slug.
Finance: compound interest, FD/RD, loan comparison, income tax (clearly dated rules), discount, tip, salary/CTC.
Date: date difference, working days, countdown, time zone converter.
