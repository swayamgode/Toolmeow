import { describe, it, expect } from 'vitest';
import {
  generateUuids,
  generateLorem,
  processUrl,
  encodeHtmlEntities,
  decodeHtmlEntities,
  decodeJwt,
} from '../lib/tools/dev';

describe('UUID Generator', () => {
  it('generates valid v4 UUIDs', () => {
    const ids = generateUuids({ quantity: 5, hyphens: true });
    expect(ids.length).toBe(5);
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuidRegex.test(ids[0])).toBe(true);
  });

  it('respects uppercase and bracket options', () => {
    const ids = generateUuids({ quantity: 1, uppercase: true, brackets: true });
    expect(ids[0].startsWith('{')).toBe(true);
    expect(ids[0].endsWith('}')).toBe(true);
  });
});

describe('Lorem Ipsum Generator', () => {
  it('generates paragraphs, sentences, and words', () => {
    const words = generateLorem({ type: 'words', count: 10, startWithLorem: true });
    expect(words.split(' ').length).toBe(10);
    expect(words.startsWith('Lorem ipsum')).toBe(true);

    const paragraphs = generateLorem({ type: 'paragraphs', count: 3 });
    expect(paragraphs.split('\n\n').length).toBe(3);
  });
});

describe('URL Encoder/Decoder', () => {
  it('encodes and decodes special characters and query strings', () => {
    const raw = 'hello world & special=true?';
    const res = processUrl(raw);
    expect(res.encoded).toBe('hello%20world%20%26%20special%3Dtrue%3F');
    expect(processUrl(res.encoded).decoded).toBe(raw);
  });
});

describe('HTML Entity Converter', () => {
  it('encodes and decodes HTML entities', () => {
    const html = '<div class="test">Fish & Chips</div>';
    const encoded = encodeHtmlEntities(html);
    expect(encoded).not.toContain('<');
    expect(encoded).toContain('&amp;');
    expect(encoded).toContain('&quot;');

    const decoded = decodeHtmlEntities('&lt;div&gt;Tom &amp; Jerry&lt;/div&gt;');
    expect(decoded).toBe('<div>Tom & Jerry</div>');
  });
});

describe('JWT Decoder', () => {
  it('decodes header and payload without server', () => {
    // Valid standard test JWT with {"alg":"HS256","typ":"JWT"} and {"sub":"1234567890","name":"John Doe","iat":1516239022}
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const decoded = decodeJwt(token);
    expect(decoded.valid).toBe(true);
    expect(decoded.header.alg).toBe('HS256');
    expect(decoded.payload.name).toBe('John Doe');
    expect(decoded.payload.sub).toBe('1234567890');
  });

  it('handles invalid JWT gracefully', () => {
    const decoded = decodeJwt('not-a-jwt');
    expect(decoded.valid).toBe(false);
    expect(decoded.error).toBeDefined();
  });
});
