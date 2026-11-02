import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy | ToolMeow',
  description:
    'ToolMeow Privacy Policy — we collect no personal data. All file processing runs locally in your browser. Learn about cookies and third-party services.',
  alternates: { canonical: `${siteConfig.url}/privacy-policy` },
  openGraph: {
    type: 'website',
    title: 'Privacy Policy | ToolMeow',
    description: 'ToolMeow Privacy Policy — no data collection, local file processing, Google AdSense cookies.',
    url: `${siteConfig.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Privacy Policy</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: 1 November 2026</p>

      <section className="prose prose-gray dark:prose-invert max-w-none">
        <p>
          Your privacy is fundamental to everything ToolMeow does. This policy explains in plain
          language what information we collect (very little), what we don&apos;t collect (almost
          everything), and how third-party services like Google AdSense interact with your browser.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Data We Collect</h2>
        <p>
          <strong>We collect no personal data.</strong> ToolMeow has no user accounts, no
          registration forms, and no login system. We do not ask for your name, email address, phone
          number, or any other personally identifiable information.
        </p>
        <p>
          All tool processing — image compression, PDF merging, EMI calculations, JSON formatting,
          unit conversions, and every other operation — happens entirely inside your browser using
          local JavaScript and WebAssembly. Your files and inputs are never transmitted to our
          servers, because we do not run application servers that receive them. The data stays on
          your device and is discarded when you close or refresh the page.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. Cookies &amp; Advertising</h2>
        <p>
          ToolMeow is funded by advertising through <strong>Google AdSense</strong>. Google and
          its partners may set cookies in your browser to serve personalised advertisements based on
          your interests and browsing history. These cookies are set by Google, not by ToolMeow,
          and are governed by{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Google&apos;s Privacy Policy
          </a>
          .
        </p>
        <p>
          You can opt out of personalised advertising at any time by visiting{' '}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            google.com/settings/ads
          </a>{' '}
          or by using the{' '}
          <a
            href="https://optout.aboutads.info/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            NAI opt-out tool
          </a>
          . Opting out means you may still see ads, but they will not be personalised to your
          interests.
        </p>
        <p>
          ToolMeow itself does not set first-party cookies beyond what is strictly necessary for
          the site to function (e.g., theme preference stored in <code>localStorage</code>, which is
          not a cookie and not transmitted to any server).
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Analytics</h2>
        <p>
          We may use privacy-preserving, aggregated analytics to understand which tools are most
          popular and how the site performs. If analytics are enabled, no individual user is
          identified, and no personally identifiable information is collected or stored.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. Third-Party Links</h2>
        <p>
          ToolMeow may link to external websites (for example, documentation, opt-out pages, or
          related resources). Once you leave ToolMeow, this Privacy Policy no longer applies. We
          are not responsible for the privacy practices of external sites and encourage you to review
          their policies before sharing any information with them.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Children&apos;s Privacy</h2>
        <p>
          ToolMeow is not directed at children under 13 years of age. We do not knowingly collect
          any information from children. If you believe a child has used this site in a way that
          raises concerns, please contact us.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy occasionally. When we do, we will update the &quot;Last
          updated&quot; date at the top. Continued use of ToolMeow after changes constitutes
          acceptance of the updated policy.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">7. Contact</h2>
        <p>
          Questions about this policy? Email us at{' '}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-blue-600 underline"
          >
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      </section>
    </article>
  );
}
