import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Terms of Service | ToolMeow',
  description:
    'ToolMeow Terms of Service — free as-is service, acceptable use policy, intellectual property, and limitation of liability.',
  alternates: { canonical: `${siteConfig.url}/terms` },
  openGraph: {
    type: 'website',
    title: 'Terms of Service | ToolMeow',
    description: 'ToolMeow Terms of Service — free as-is service, acceptable use, and limitation of liability.',
    url: `${siteConfig.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Terms of Service</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: 1 November 2026</p>

      <section className="prose prose-gray dark:prose-invert max-w-none">
        <p>
          By using ToolMeow you agree to these terms. If you do not agree, please stop using the
          site.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Free Service — No Warranty</h2>
        <p>
          ToolMeow is provided free of charge, <strong>&quot;as is&quot;</strong>, without any warranty of
          any kind — express or implied — including but not limited to warranties of
          merchantability, fitness for a particular purpose, or non-infringement. We do not
          guarantee that the site will be available at all times, error-free, or free of viruses or
          other harmful components.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. Accuracy Not Guaranteed</h2>
        <p>
          Results produced by our tools — especially financial calculators such as the EMI
          Calculator, SIP Calculator, GST Calculator, and Percentage Calculator — are
          <strong> estimates for informational purposes only</strong>. They do not constitute
          financial, legal, or professional advice. Always verify important calculations with a
          qualified professional or official source before making decisions based on them.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Use automated scripts, bots, or crawlers to scrape or abuse the service.</li>
          <li>Attempt to reverse-engineer, copy, or redistribute the site&apos;s source code without permission.</li>
          <li>Use the site in any way that violates applicable laws or regulations.</li>
          <li>Interfere with or disrupt the site&apos;s infrastructure or other users&apos; experience.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. Intellectual Property</h2>
        <p>
          All content on ToolMeow — including but not limited to the tool interfaces, design,
          copy, and branding — is the intellectual property of ToolMeow and is protected by
          applicable copyright laws. You may not reproduce, distribute, or create derivative works
          without explicit written permission.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, ToolMeow and its operators shall not be liable
          for any indirect, incidental, special, consequential, or punitive damages arising from
          your use of — or inability to use — this service, even if advised of the possibility of
          such damages.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Changes to Terms</h2>
        <p>
          We may update these terms at any time. Continued use of the site after changes constitutes
          acceptance of the updated terms. The &quot;Last updated&quot; date at the top reflects the most
          recent revision.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">7. Governing Law</h2>
        <p>
          These terms are governed by applicable law. Any disputes shall be resolved in the
          jurisdiction where ToolMeow operates.
        </p>

        <p className="mt-6">
          Questions?{' '}
          <a href="/contact" className="text-blue-600 underline">
            Contact us
          </a>
          .
        </p>
      </section>
    </article>
  );
}
