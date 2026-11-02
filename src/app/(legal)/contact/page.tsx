import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact Us | ToolMeow',
  description:
    'Get in touch with the ToolMeow team. Report bugs, suggest features, or reach out for business and advertising enquiries.',
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    type: 'website',
    title: 'Contact Us | ToolMeow',
    description: 'Get in touch with the ToolMeow team for bug reports, feature requests, or business enquiries.',
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Contact Us</h1>

      <section className="prose prose-gray dark:prose-invert max-w-none">
        <p>
          We&apos;re a small team and we genuinely read every message. Whether you&apos;ve found a bug,
          have a tool idea, or want to discuss a business partnership — drop us an email.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Bug Reports</h2>
        <p>
          Found something broken? Please include the tool name, what you expected to happen, what
          actually happened, and your browser &amp; OS. The more detail, the faster we can fix it.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Feature Suggestions</h2>
        <p>
          We love hearing about tools you wish existed. If there&apos;s a free, privacy-preserving
          browser-based tool you&apos;d find useful, tell us — we may well build it.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Business &amp; Advertising Enquiries</h2>
        <p>
          For sponsorship, partnerships, or advertising enquiries beyond our standard AdSense
          placements, please reach out via email with the subject line &quot;Business Enquiry&quot;.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Email Us</h2>
        <p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-blue-600 underline text-lg font-medium"
          >
            {siteConfig.contactEmail}
          </a>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          We aim to respond within 2–3 business days. For urgent bug reports affecting tool
          functionality, we typically respond within 24 hours.
        </p>
      </section>
    </article>
  );
}
