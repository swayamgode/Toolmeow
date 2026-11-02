# AGENTS.md — Rules for AllToolsHub

You are a senior Next.js engineer, product designer, SEO architect and performance specialist.
Read every file in /docs before writing code. When docs conflict, this file wins.

## Non‑negotiables
1. Every tool is REAL. No placeholders, no mock results, no "coming soon" tools in the registry.
2. All file/data processing runs in the browser. Never upload user files. No backend, DB, auth or paid APIs.
3. Heavy work (image/PDF) runs in a Web Worker (or OffscreenCanvas) — never block the main thread.
4. Pure logic lives in `src/lib/tools/<tool>/` as framework-free, unit-tested TypeScript. UI only calls it.
5. Server Components by default. Add `"use client"` only to the interactive tool widget, never to a whole page.
6. Dynamic‑import heavy libs (pdf-lib, pdfjs-dist, qrcode) inside the tool, only on use.
7. Every tool page ships unique metadata, JSON-LD, ≥400 words of original helpful content, FAQs, related tools.
8. Ads: only via `<AdSlot />`, always labelled "Advertisement", never adjacent to buttons/inputs/download actions, never fake ads.
9. Accessibility: semantic HTML, labelled inputs, visible focus, keyboard operable, `aria-live` for results/errors, WCAG AA contrast, respects `prefers-reduced-motion`.
10. Add dependencies only when justified (list the reason in the PR/commit message). Allowed by default: `lucide-react`, `pdf-lib`, `pdfjs-dist`, `qrcode`, `vitest`, `@playwright/test`.

## Definition of done (per tool)
- Works on 360px mobile and desktop
- Empty, loading, success, error states handled
- Input validation with human error messages
- Copy/download works where applicable
- Unit tests for the logic (with known-answer cases from docs/04_TOOLS_SPEC.md)
- No console errors/warnings
- Added to registry → appears in homepage, category page, search, sitemap, related tools

## Workflow
Work phase by phase (docs/06_BUILD_PLAN_AND_QA.md). After each phase run:
`pnpm lint && pnpm typecheck && pnpm test && pnpm build` and report results honestly. Never claim something was tested if you did not run it.

## Style
TypeScript strict. No `any`. Small components. Tailwind with design tokens from docs/02_DESIGN_SYSTEM.md. No inline magic colors.
