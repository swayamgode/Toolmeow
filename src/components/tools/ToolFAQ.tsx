import React from 'react';
import type { FAQItem } from '@/config/tools';
import { Accordion } from '@/components/ui/Accordion';

export interface ToolFAQProps {
  faqs: FAQItem[];
  toolName: string;
}

export const ToolFAQ: React.FC<ToolFAQProps> = ({ faqs, toolName }) => {
  if (!faqs || faqs.length === 0) return null;

  const accordionItems = faqs.map((faq, index) => ({
    id: `faq-${index}`,
    title: faq.q,
    content: <p>{faq.a}</p>,
  }));

  return (
    <section className="py-10 border-t border-[#E7E7E4]">
      <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B0B0F] tracking-tight mb-6">
        Frequently Asked Questions about {toolName}
      </h2>
      <Accordion items={accordionItems} defaultOpenId="faq-0" />
    </section>
  );
};

