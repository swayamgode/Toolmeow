/**
 * Pure framework-free logic for UUID/GUID, Lorem Ipsum, URL Encoding, HTML Entities, and JWT Decoding
 */

// --- 1. UUID Generator ---
export interface UuidOptions {
  quantity: number;
  uppercase?: boolean;
  hyphens?: boolean;
  brackets?: boolean;
}

export function generateUuids(options: UuidOptions): string[] {
  const { quantity = 1, uppercase = false, hyphens = true, brackets = false } = options;
  const count = Math.max(1, Math.min(1000, quantity));
  const results: string[] = [];

  for (let i = 0; i < count; i++) {
    let id: string;
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      id = crypto.randomUUID();
    } else {
      id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    if (!hyphens) {
      id = id.replace(/-/g, '');
    }
    if (uppercase) {
      id = id.toUpperCase();
    }
    if (brackets) {
      id = `{${id}}`;
    }
    results.push(id);
  }

  return results;
}

// --- 2. Lorem Ipsum Generator ---
const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'curabitur', 'pretium',
  'tincidunt', 'lacus', 'nulla', 'gravida', 'orci', 'a', 'odio', 'nullam', 'varius',
  'turpis', 'et', 'commodo', 'pharetra', 'est', 'eros', 'bibendum', 'elit', 'nec',
  'luctus', 'magna', 'felis', 'sollicitudin', 'mauris', 'integer', 'in', 'mauris'
];

export interface LoremOptions {
  type: 'paragraphs' | 'sentences' | 'words';
  count: number;
  startWithLorem?: boolean;
}

export function generateLorem(options: LoremOptions): string {
  const { type, count, startWithLorem = true } = options;
  const num = Math.max(1, Math.min(100, count));

  if (type === 'words') {
    const words: string[] = [];
    if (startWithLorem) {
      words.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet');
    }
    while (words.length < num) {
      const idx = Math.floor(Math.random() * LOREM_WORDS.length);
      words.push(LOREM_WORDS[idx]);
    }
    return words.slice(0, num).join(' ');
  }

  if (type === 'sentences') {
    const sentences: string[] = [];
    for (let i = 0; i < num; i++) {
      sentences.push(generateSentence(i === 0 && startWithLorem));
    }
    return sentences.join(' ');
  }

  // Paragraphs
  const paragraphs: string[] = [];
  for (let i = 0; i < num; i++) {
    const sentenceCount = 4 + Math.floor(Math.random() * 4);
    const pSentences: string[] = [];
    for (let j = 0; j < sentenceCount; j++) {
      pSentences.push(generateSentence(i === 0 && j === 0 && startWithLorem));
    }
    paragraphs.push(pSentences.join(' '));
  }
  return paragraphs.join('\n\n');
}

function generateSentence(isStart: boolean): string {
  const len = 8 + Math.floor(Math.random() * 8);
  const words: string[] = [];
  if (isStart) {
    words.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet');
  }
  while (words.length < len) {
    const idx = Math.floor(Math.random() * LOREM_WORDS.length);
    words.push(LOREM_WORDS[idx]);
  }
  const result = words.slice(0, len).join(' ');
  return result.charAt(0).toUpperCase() + result.slice(1) + '.';
}

// --- 3. URL Encoder / Decoder ---
export interface UrlParseResult {
  encoded: string;
  decoded: string;
  queryParams: { key: string; value: string }[];
}

export function processUrl(input: string): UrlParseResult {
  if (!input) return { encoded: '', decoded: '', queryParams: [] };

  let encoded = '';
  let decoded = '';

  try {
    encoded = encodeURIComponent(input);
  } catch {
    encoded = input;
  }

  try {
    decoded = decodeURIComponent(input);
  } catch {
    decoded = input;
  }

  const queryParams: { key: string; value: string }[] = [];
  try {
    const urlStr = input.includes('://') ? input : `http://dummy.com/${input.startsWith('?') ? input : `?${input}`}`;
    const parsed = new URL(urlStr);
    parsed.searchParams.forEach((value, key) => {
      queryParams.push({ key, value });
    });
  } catch {
    // Ignore invalid query parameter string
  }

  return { encoded, decoded, queryParams };
}

// --- 4. HTML Entity Converter ---
export function encodeHtmlEntities(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function decodeHtmlEntities(text: string): string {
  if (!text) return '';
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
}

// --- 5. JWT Token Decoder ---
export interface JwtDecoded {
  valid: boolean;
  error?: string;
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  isExpired?: boolean;
  issuedAt?: string;
  expiresAt?: string;
}

export function decodeJwt(token: string): JwtDecoded {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Empty token', header: {}, payload: {}, signature: '' };
  }

  const clean = token.trim();
  const parts = clean.split('.');

  if (parts.length !== 3) {
    return {
      valid: false,
      error: `Invalid JWT format. Expected 3 segments separated by dots, found ${parts.length}.`,
      header: {},
      payload: {},
      signature: '',
    };
  }

  try {
    const parseBase64Url = (str: string) => {
      let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) {
        base64 += '=';
      }
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return JSON.parse(new TextDecoder().decode(bytes));
    };

    const header = parseBase64Url(parts[0]);
    const payload = parseBase64Url(parts[1]);
    const signature = parts[2];

    let isExpired: boolean | undefined;
    let issuedAt: string | undefined;
    let expiresAt: string | undefined;

    if (typeof payload.exp === 'number') {
      const expDate = new Date(payload.exp * 1000);
      expiresAt = expDate.toISOString();
      isExpired = Date.now() > expDate.getTime();
    }

    if (typeof payload.iat === 'number') {
      issuedAt = new Date(payload.iat * 1000).toISOString();
    }

    return {
      valid: true,
      header,
      payload,
      signature,
      isExpired,
      issuedAt,
      expiresAt,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to decode JWT segments';
    return {
      valid: false,
      error: `Decoding error: ${message}`,
      header: {},
      payload: {},
      signature: parts[2] || '',
    };
  }
}
