export const siteConfig = {
  name: 'ToolMeow',
  shortName: 'ToolMeow',
  description: 'Fast, private, free browser-based tools. Files never leave your device.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.toolmeow.in',
  author: 'ToolMeow Team',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@toolmeow.com',
  adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-3027613620365055',
  locale: 'en_IN',
  navItems: [
    { label: 'All Tools', href: '/tools' },
    { label: 'Guides & Blog', href: '/blog' },
    { label: 'Categories', href: '/#categories' },
    { label: 'About', href: '/about' },
  ],
  trustChips: ['No uploads', 'No signup', '100% Free', 'Runs in Browser'],
} as const;

export type SiteConfig = typeof siteConfig;

