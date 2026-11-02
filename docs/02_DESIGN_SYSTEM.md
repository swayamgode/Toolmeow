# 02 — Design System (derived from the Selly reference)

## What to borrow from the reference
- **Atmosphere:** soft cloud-like gradient (sky blue → lavender → faint peach) behind the hero only; rest of site is calm off-white.
- **Frame:** hero sits inside a rounded (28–32px) translucent "glass" container with 1px white/60 border and faint outer glow.
- **Typography:** Inter (or Geist). Headline ~72–84px desktop / 40–44px mobile, weight 700, letter-spacing −0.04em, line-height 1.02, centered, 2 lines.
- **Buttons:** primary = near-black pill/rounded-xl with soft drop shadow and light inner top highlight; secondary = white with subtle shadow. Icon inside button (arrow / zap).
- **Hairline grid lines** (1px, white/50) crossing the hero as decorative guides. Hide on mobile.
- **Product preview** overlapping the bottom of the hero: window chrome (3 dots), search bar, sidebar, cards with small tag chips. For us: a live mini-tool inside a faux window.
- **Chips/tags:** tiny rounded gray pills (`Design`, `Hiring` style) → used for tool tags (`Free`, `Offline`, `No upload`).
- **Nav:** small 13px links, centered, dark pill Login-style CTA on the right → we use "All tools".

## Tokens (Tailwind `theme.extend` + CSS variables)
```
--bg:            #FAFAF9   (off-white)
--surface:       #FFFFFF
--surface-muted: #F4F4F2
--border:        #E7E7E4
--text:          #0B0B0F
--text-muted:    #5B5B66
--accent:        #4F46E5   (indigo — ONE accent only)
--accent-soft:   #EEF0FF
--success:       #16A34A   --danger: #DC2626   --warning: #D97706
--hero-gradient: linear-gradient(135deg,#CFE6FF 0%,#E6E3FF 50%,#FBE3EC 100%)
--radius-sm 8px · --radius-md 12px · --radius-lg 20px · --radius-xl 28px
--shadow-btn: 0 6px 16px rgba(11,11,15,.25), inset 0 1px 0 rgba(255,255,255,.18)
--shadow-card: 0 1px 2px rgba(11,11,15,.04), 0 8px 24px rgba(11,11,15,.06)
```
Dark mode: optional, phase 2. Do not ship half-baked dark mode.

## Type scale
Display 44/76 · H1 36/48 · H2 28/36 · H3 20/28 · Body 16/26 · Small 14/22 · Caption 12/16. Use `tabular-nums` for all calculator outputs.

## Spacing & layout
4px base grid. Container max-width 1200px, page padding 16 (mobile) / 24 / 32. Section vertical rhythm 64–96px desktop, 48px mobile. Tool interface card max-width 880px.

## Components (visual rules)
- **ToolCard:** white surface, 1px border, radius-lg, 20px padding, lucide icon in 40px accent-soft square, title, 1-line description, tag chips. Hover: translate-y −2px + shadow-card (disabled under reduced-motion).
- **Inputs:** 44px min height (touch), 1px border, radius-md, visible focus ring `2px accent @ 40%` + offset. Labels always visible (no placeholder-only).
- **FileUploader:** dashed border zone, icon, "Drop files here or browse", accepted types + max size text, paste support, per-file row with remove button and progress.
- **Result panel:** muted surface, big number/value, copy button, success state with subtle green check.
- **AdSlot:** gray-50 background, dashed border, tiny "Advertisement" label, min-height reserved to prevent CLS, margin ≥ 32px around.
- **Motion:** 150–200ms ease-out; fade/slide-up on section reveal via CSS only. No heavy animation libraries.

## Accessibility
Contrast ≥ 4.5:1 text, ≥ 3:1 UI. Focus never removed. Targets ≥ 44×44px. All icons paired with text or `aria-label`. Errors announced via `role="alert"`; results via `aria-live="polite"`.

## Icon map (lucide-react)
Image Compressor `ImageDown` · PDF Compressor `FileArchive` · QR `QrCode` · Resizer `Scaling` · EMI `Landmark` · SIP `TrendingUp` · JPG→PDF `FileImage` · Age `CalendarClock` · Word Counter `Type` · GST `Receipt` · JSON `Braces` · Percentage `Percent` · PDF Merger `Merge` · Format Converter `Repeat` · Unit Converter `Ruler`
