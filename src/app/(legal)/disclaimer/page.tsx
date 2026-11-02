import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Disclaimer | ToolMeow',
  description:
    'ToolMeow Disclaimer — financial calculators are informational only, not professional advice. Image and PDF tools process files locally with no data retention.',
  alternates: { canonical: `${siteConfig.url}/disclaimer` },
  openGraph: {
    type: 'website',
    title: 'Disclaimer | ToolMeow',
    description: 'Financial tools are for informational purposes only. Not financial, legal, or professional advice.',
    url: `${siteConfig.url}/disclaimer`,
  },
};

export default function DisclaimerPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Disclaimer</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: 1 November 2026</p>

      <section className="prose prose-gray dark:prose-invert max-w-none">
        <p>
          Please read this disclaimer carefully before using ToolMeow. By using this site you
          acknowledge and agree to the limitations described below.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Financial Calculators — Informational Only</h2>
        <p>
          ToolMeow provides financial calculators including the <strong>EMI Calculator</strong>,{' '}
          <strong>SIP Calculator</strong>, <strong>GST Calculator</strong>, and{' '}
          <strong>Percentage Calculator</strong>. These tools are provided for{' '}
          <strong>informational and educational purposes only</strong>. They are not intended to
          constitute — and must not be relied upon as — financial, investment, tax, legal, or any
          other professional advice.
        </p>
        <p>
          Results are <strong>estimates based on inputs you provide</strong>. They assume fixed
          interest rates, idealized compounding periods, and current GST rates as programmed — all
          of which may differ from real-world lender terms, market conditions, or official
          government rates at the time you use the tool.
        </p>
        <p>
          Before making any financial decision — including taking a loan, investing in a mutual fund,
          or computing tax liability — you should <strong>consult a qualified financial or legal
          professional</strong> and verify figures with your lender, broker, or the official
          government source (e.g., the GST Council or Reserve Bank of India rate schedules).
          ToolMeow accepts no liability for decisions made based on calculator outputs.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Image &amp; PDF Tools — Local Processing, No Warranty</h2>
        <p>
          All image and PDF operations (compression, resizing, merging, splitting, conversion) are
          performed <strong>entirely within your browser</strong>. No files are uploaded to any
          server; no data is retained after you close or refresh the tab. While we make every effort
          to ensure tools work correctly, they are provided without warranty. Always keep backups of
          important files before processing them with any online tool, including ours.
        </p>
        <p>
          Output quality and fidelity depend on the input file, browser capabilities, and the
          parameters you choose. ToolMeow is not responsible for data loss, corruption, or
          unintended modifications resulting from tool use.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">General Accuracy</h2>
        <p>
          We strive to keep all tool logic accurate and up to date, but we make no representations
          about the completeness, reliability, or suitability of any tool for any particular
          purpose. Information on this site may contain errors or become outdated. Use results as a
          starting point for further research, not as a definitive answer.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Third-Party Links</h2>
        <p>
          This site may link to external resources for reference. We do not endorse, control, or
          take responsibility for the content of any third-party website. Visiting external links is
          at your own risk.
        </p>

        <p className="mt-6">
          Questions about this disclaimer?{' '}
          <a href="/contact" className="text-blue-600 underline">
            Contact us
          </a>
          .
        </p>
      </section>
    </article>
  );
}
