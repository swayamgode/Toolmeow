export type ToolCategory =
  | 'image'
  | 'pdf'
  | 'finance'
  | 'text-dev'
  | 'converters'
  | 'date-time';

export interface CategoryDefinition {
  slug: ToolCategory;
  name: string;
  tagline: string;
  description: string;
  icon: string;
}

export const CATEGORIES: Record<ToolCategory, CategoryDefinition> = {
  image: {
    slug: 'image',
    name: 'Image Tools',
    tagline: 'Compress, resize, convert, and generate images locally.',
    description:
      'Optimize, resize, and convert your visual media without uploading a single byte to external servers. All operations execute strictly within your local browser sandbox using modern Web Workers, Canvas, and WebAssembly technologies. Enjoy instant conversions between JPG, PNG, and WebP, lossless compression, custom aspect-ratio resizing, and high-definition QR code generation with zero latency, zero limits, and guaranteed personal privacy.',
    icon: 'ImageDown',
  },
  pdf: {
    slug: 'pdf',
    name: 'PDF Tools',
    tagline: 'Merge, compress, and convert PDF documents in your browser.',
    description:
      'Manage confidential PDF documents securely with 100% client-side document processing. Whether you need to combine multiple contracts into a single file, convert photo batches into standardized PDF booklets, or reduce PDF file sizes for government application forms, our browser-native toolset delivers swift, deterministic results without transmitting proprietary files over the network.',
    icon: 'FileArchive',
  },
  finance: {
    slug: 'finance',
    name: 'Finance & Calculators',
    tagline: 'Accurate financial planning for loans, investments, and taxes.',
    description:
      'Make informed monetary choices with instant calculations designed for Indian and global financial setups. Calculate monthly loan EMIs, plan long-term wealth creation with compounding SIP models, determine exact GST splits across CGST, SGST, and IGST brackets, or compute percentage variations effortlessly. Every calculator delivers crystal-clear amortization breakdowns and visual summaries with en-IN currency formatting.',
    icon: 'Landmark',
  },
  'text-dev': {
    slug: 'text-dev',
    name: 'Text & Dev Tools',
    tagline: 'Text statistics, JSON validation, formatting, and developer utilities.',
    description:
      'Streamline everyday coding and writing tasks with zero-lag browser utilities. Validate, inspect, format, and minify messy JSON payloads with precise error highlighting down to line and column numbers. Analyze content metrics with Unicode-aware word, character, and sentence counters, estimate reading speeds, and extract keyword density reports with complete privacy for your sensitive copy.',
    icon: 'Braces',
  },
  converters: {
    slug: 'converters',
    name: 'Unit Converters',
    tagline: 'Precise multi-unit conversions across metric and imperial systems.',
    description:
      'Switch seamlessly between metric, imperial, and digital computation units. Convert length, weight, area, volume, temperature, data storage, speed, and pressure with mathematical rigor and bi-directional accuracy. Backed by standard conversion constants and round-trip verification, these utilities guarantee dependable figures for engineering, academic, or daily home requirements.',
    icon: 'Ruler',
  },
  'date-time': {
    slug: 'date-time',
    name: 'Date & Time',
    tagline: 'Chronological tools for birthdays, age, and interval calculation.',
    description:
      'Calculate chronological milestones, biological age, and calendar intervals with full leap-year and month-end awareness. Determine exact years, months, and days elapsed, discover days until your next anniversary or birthday, and break down time spans into total weeks, days, and hours with timezone-faithful precision.',
    icon: 'CalendarClock',
  },
};

