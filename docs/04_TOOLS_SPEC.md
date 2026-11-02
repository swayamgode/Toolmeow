# 04 — Tools Specification (15 launch tools)

Each tool must meet AGENTS.md "definition of done". Formulas and known-answer tests below are mandatory unit tests.

---
## IMAGE
### 1. Image Compressor — `image-compressor`
- Input: JPG/PNG/WebP, multi-file. Controls: quality slider (10–100, default 75), optional max-width, output format (keep / WebP / JPEG).
- Logic: `createImageBitmap` → OffscreenCanvas in Worker → `convertToBlob({type, quality})`. PNG is lossless in canvas; so offer "Convert to WebP/JPEG for bigger savings" and say so in UI.
- Output: per-file before/after size, % saved, side-by-side preview slider, download single / "Download all (ZIP)" (implement tiny store-only ZIP writer or use `fflate` if justified).
- Edge: if output is larger than input, keep original and tell the user. EXIF orientation respected. Transparent PNG → warn when converting to JPEG (fill white).

### 4. Image Resizer — `image-resizer`
- Modes: by pixels (w/h with lock aspect), by percentage, preset sizes (e.g. 1080×1080, 1920×1080, 1200×630). Fit: contain/cover/stretch. Output format + quality.
- Quality: use stepped downscale (halve repeatedly) for sharper results; `imageSmoothingQuality='high'`.
- Validate 1–16384 px. Show new dimensions + estimated file size.

### 14. Image Format Converter — `image-format-converter`
- JPG ⇄ PNG ⇄ WebP (+ AVIF output only if `canvas.toBlob('image/avif')` is feature-detected; hide option otherwise). Batch. Background colour picker for transparency → JPEG.
- Don't claim HEIC support unless implemented.

### 3. QR Code Generator — `qr-code-generator`
- Types: URL, text, Wi‑Fi (`WIFI:T:WPA;S:name;P:pass;;` with proper escaping of `\ ; , : "`), email, phone, vCard.
- Options: size (128–1024), error correction (L/M/Q/H), foreground/background colour, margin. Warn when contrast is too low to scan.
- Output: live preview; download PNG and SVG; copy PNG to clipboard where supported.
- Lib: `qrcode` (justified). Data stays local.

---
## PDF
### 2. PDF Compressor — `pdf-compressor`
Be honest about browser limits. Two modes:
- **Lossless optimise (default):** `pdf-lib` load → drop metadata, re-save with `useObjectStreams`. Often small savings.
- **Strong compression (rasterise):** `pdfjs-dist` render each page to canvas at chosen DPI (72/110/150) → JPEG quality → rebuild with `pdf-lib`. Warn clearly: **text becomes non-selectable**, best for scanned PDFs.
- Show before/after size; if result is not smaller, say so and offer the original. Progress per page, cancel button, worker rendering. Password-protected → clear error.

### 7. JPG to PDF — `jpg-to-pdf`
- Multi-image, drag to reorder (also up/down buttons for a11y), remove. Page size: A4/Letter/Fit-to-image; orientation auto; margin none/small/big. Embed JPEG bytes directly (no recompress); PNG via `embedPng`. Respect EXIF rotation (draw via canvas when rotation ≠ 1).
- Output: download `images.pdf`; show page count and size.

### 13. PDF Merger — `pdf-merger`
- Multi-PDF upload, reorder, remove, show page counts, merge with `pdf-lib copyPages`. Optional page-range per file (`1-3,5`). Validate ranges. Encrypted PDFs → error. Download merged file.

---
## FINANCE (all outputs en-IN formatting, ₹ default, currency selector optional)
### 5. EMI Calculator — `emi-calculator`
- Inputs: principal, annual rate %, tenure (months or years toggle). Validate > 0; rate 0 handled.
- `r = rate/12/100; EMI = P·r·(1+r)^n / ((1+r)^n − 1)`; if r=0, EMI = P/n.
- Output: EMI, total interest, total payment, donut chart (inline SVG), full amortisation table (month, interest, principal, balance), CSV download. Final balance must reach 0 (round last payment).
- **Test:** P=1,000,000; 10% p.a.; 120 months → EMI ≈ ₹13,215.07; total payment ≈ ₹1,585,808; interest ≈ ₹585,808.

### 6. SIP Calculator — `sip-calculator`
- Inputs: monthly investment, expected annual return %, years. Optional annual step-up %.
- `i = rate/12/100; FV = P · [((1+i)^n − 1)/i] · (1+i)` (payments at start of month — state this assumption in UI). Output invested, est. returns, maturity value, growth chart (SVG line/stacked bar), yearly table.
- **Test:** P=5,000; 12%; 10 years → FV ≈ ₹1,161,695 (±₹1). Show disclaimer: returns are not guaranteed.

### 10. GST Calculator — `gst-calculator`
- Modes: Add GST (exclusive) / Remove GST (inclusive). Rate chips: 0, 0.25, 3, 5, 12, 18, 28 (+custom). Intra-state split CGST/SGST vs inter-state IGST toggle.
- Add: `gst = amt·rate/100; total = amt+gst`. Remove: `base = amt·100/(100+rate); gst = amt − base`.
- **Test:** ₹1,000 @18% add → GST 180, total 1,180. ₹1,180 @18% remove → base 1,000, GST 180. Round to 2 dp (half-up) and show rounding note. Add disclaimer: rates change; verify with official GST sources.

### 12. Percentage Calculator — `percentage-calculator`
- Modes (all live): X% of Y · X is what % of Y · % change from X to Y · increase/decrease X by Y% · reverse (X is Y% of what).
- Guard divide-by-zero, negatives allowed where meaningful, avoid float artefacts (round for display only, keep full precision internally).
- **Tests:** 15% of 200 = 30; 50 is 25% of 200; 80→100 = +25%; 100→80 = −20%.

---
## DATE & TEXT & DEV
### 8. Age Calculator — `age-calculator`
- Inputs: date of birth, "as of" date (default today, user's local TZ). Output: years/months/days, total months/weeks/days/hours, next birthday + days remaining + weekday of birth.
- Calendar-correct borrow logic (days-in-month), leap-day births (29 Feb → observe on 28 Feb in non-leap years; state it). Reject future DOB.
- **Tests:** 2000‑01‑31 → 2000‑03‑01 handles month-end borrow; leap-day DOB (2000‑02‑29) compared against an independent reference implementation (e.g. date-fns `intervalToDuration`) across 1,000 random dates in a dev-only test.

### 9. Word Counter — `word-counter`
- Live counts: words (Unicode-aware via `Intl.Segmenter` when available, fallback regex), characters (with/without spaces), sentences, paragraphs, lines, reading time (200 wpm), speaking time (130 wpm), top 10 keywords with density (stop-word toggle), clear + copy stats. Handle 1M+ chars via debounced/idle compute.

### 11. JSON Formatter — `json-formatter`
- Actions: Format (2/4 space/tab), Minify, Validate, Sort keys, Copy, Download `.json`.
- Errors: show message **with line & column** (derive from `SyntaxError` position; compute line/col from offset). Large JSON (> 5 MB) parsed in worker. Optional tree view collapsible. No `eval`.
- **Tests:** valid/invalid fixtures, unicode, deep nesting, numbers > 2^53 warning.

---
## CONVERTERS
### 15. Unit Converter — `unit-converter`
- Categories: Length, Weight/Mass, Temperature, Area, Volume, Speed, Time, Data (decimal KB vs binary KiB labelled), Energy, Pressure.
- Data-driven table: each unit has `toBase` / `fromBase` factors (temperature via functions). Swap button, precision selector, copy, show formula line, full conversion table for the value.
- **Tests:** 1 mile = 1609.344 m; 100 °C = 212 °F; 1 acre = 4046.8564224 m²; 1 GiB = 1,073,741,824 B; round-trip property test (a→b→a within 1e‑9 relative).

---
## Per-tool content requirements
For each: 5–8 FAQs, 4–6 step "How to use", formulas/explanation, privacy note (file tools), limitations note. Write original, genuinely useful copy — no filler, no copy-paste between tools.
