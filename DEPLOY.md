# Deployment Guide — AllToolsHub

This document outlines the deployment procedure and environment configuration for AllToolsHub on Vercel.

## 1. Prerequisites
- Node.js 20+ / 24+
- `pnpm` (v10+)
- Vercel account linked to GitHub repository

## 2. Environment Variables

Configure the following environment variables in Vercel project settings:

| Variable | Description | Example Value |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical root domain | `https://alltoolshub.com` |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Google AdSense publisher ID | `ca-pub-XXXXXXXXXXXXXXXX` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Support & enquiries email | `hello@alltoolshub.com` |

## 3. Build & Verification Commands

Before deploying or in CI/CD pipeline, run:

```bash
# 1. Validate tool registry (word count, SEO, FAQs, schemas)
pnpm validate:registry

# 2. Linting
pnpm lint

# 3. Type checking
pnpm typecheck

# 4. Unit tests
pnpm test

# 5. Production build
pnpm build
```

## 4. Google AdSense & Search Console Setup

1. **ads.txt**: Verify `https://alltoolshub.com/ads.txt` is reachable and replace `pub-XXXXXXXXXXXXXXXX` with your actual AdSense publisher ID.
2. **Sitemap**: Submit `https://alltoolshub.com/sitemap.xml` in Google Search Console.
3. **Robots**: Confirm `https://alltoolshub.com/robots.txt` is serving properly.

## 5. Security & Privacy Guarantees

- All file and calculation processing is client-side in the browser.
- Security headers configured (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`).
- Zero user data stored or sent to remote backend servers.

