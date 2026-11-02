import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About ToolMeow | Free Online Tools',
  description:
    'Learn about ToolMeow — a free, privacy-first collection of browser-based tools for finance, images, PDFs, text, and more. No uploads, no accounts.',
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    type: 'website',
    title: 'About ToolMeow | Free Online Tools',
    description:
      'Learn about ToolMeow — a free, privacy-first collection of browser-based tools for finance, images, PDFs, text, and more.',
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        About ToolMeow
      </h1>

      <section className="prose prose-gray dark:prose-invert max-w-none">
        <h2 className="text-xl font-semibold mt-8 mb-3">Our Mission</h2>
        <p>
          ToolMeow was built on a simple premise: everyday productivity tools should be free,
          fast, and completely private. Whether you need to calculate an EMI, compress an image,
          merge PDFs, or convert units, you should be able to do it instantly — without creating an
          account, without uploading your files to a stranger&apos;s server, and without paying a
          subscription fee.
        </p>
        <p>
          Every single tool on ToolMeow runs entirely inside your browser. Your files, your data,
          and your calculations never leave your device. We process everything locally using modern
          Web APIs and WebAssembly, which means faster results and absolute privacy by design — not
          just by policy.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">What We Offer</h2>
        <p>
          We currently offer 15+ free tools across five categories, with more being added regularly:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Finance Tools:</strong> EMI Calculator, SIP Calculator, GST Calculator,
            Percentage Calculator — useful for quick financial estimates.
          </li>
          <li>
            <strong>Image Tools:</strong> Image Compressor, Image Resizer, Format Converter,
            Base64 Encoder — all processed locally with no uploads.
          </li>
          <li>
            <strong>PDF Tools:</strong> PDF Merger, PDF Splitter, PDF to Image — powered by
            pdf-lib running directly in your browser.
          </li>
          <li>
            <strong>Text &amp; Developer Tools:</strong> Word Counter, JSON Formatter, Lorem Ipsum
            Generator, Markdown Previewer — ideal for writers and developers.
          </li>
          <li>
            <strong>Unit Converters:</strong> Length, Weight, Temperature and more — instant,
            offline-capable conversions.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">Who Built This?</h2>
        <p>
          ToolMeow is an independent project built by a small team of developers who were tired
          of bloated, ad-heavy, upload-required tool sites. We wanted something lean, honest, and
          genuinely useful. So we built it ourselves, and we&apos;re sharing it with everyone for free.
        </p>
        <p>
          The project is built with Next.js, TypeScript, and Tailwind CSS. All tool logic is
          framework-free TypeScript, thoroughly tested, and open to scrutiny. Performance and
          accessibility are first-class concerns — every tool works on mobile, respects reduced
          motion preferences, and meets WCAG AA contrast standards.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">How We Stay Free</h2>
        <p>
          ToolMeow is funded by non-intrusive Google AdSense advertisements. Ads are clearly
          labelled &quot;Advertisement&quot;, never placed adjacent to tool inputs or download buttons, and
          never faked or disguised as tool results. We follow Google&apos;s placement policies strictly.
          If you use an ad blocker, the tools still work perfectly — we never gate features behind
          ads or paywalls.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Our Privacy Commitment</h2>
        <p>
          We do not collect personal data, we do not run analytics that track individuals, and we
          do not sell data of any kind. Google AdSense may set cookies for ad personalisation — you
          can opt out at{' '}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            google.com/settings/ads
          </a>
          . See our{' '}
          <a href="/privacy-policy" className="text-blue-600 underline">
            Privacy Policy
          </a>{' '}
          for full details.
        </p>

        <p className="mt-6">
          Have questions, bug reports, or feature ideas? We&apos;d love to hear from you —{' '}
          <a href="/contact" className="text-blue-600 underline">
            reach out via our contact page
          </a>
          .
        </p>
      </section>
    </article>
  );
}
