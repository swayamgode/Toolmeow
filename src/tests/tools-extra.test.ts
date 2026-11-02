import { describe, it, expect } from 'vitest';
import { convertCase, computeDiff } from '../lib/tools/text';
import { generatePassword, evaluatePasswordStrength, computeHash } from '../lib/tools/security';
import { textToBase64, base64ToText, csvToJson, jsonToCsv } from '../lib/tools/encoding';
import { parseTimestampInput, dateToTimestamp } from '../lib/tools/datetime';
import { parseHexColor, getContrastRatio } from '../lib/tools/color';
import { parseMarkdown } from '../lib/tools/markdown';
import { testRegex } from '../lib/tools/regex';

describe('Case Converter', () => {
  it('converts to upper and lower case', () => {
    expect(convertCase('hello world', 'upper')).toBe('HELLO WORLD');
    expect(convertCase('HELLO WORLD', 'lower')).toBe('hello world');
  });

  it('converts to title and sentence case', () => {
    expect(convertCase('hello world', 'title')).toBe('Hello World');
    expect(convertCase('hello world. this is test.', 'sentence')).toBe('Hello world. This is test.');
  });

  it('converts to camel, pascal, snake, kebab, constant case', () => {
    expect(convertCase('hello world test', 'camel')).toBe('helloWorldTest');
    expect(convertCase('hello world test', 'pascal')).toBe('HelloWorldTest');
    expect(convertCase('hello world test', 'snake')).toBe('hello_world_test');
    expect(convertCase('hello world test', 'kebab')).toBe('hello-world-test');
    expect(convertCase('hello world test', 'constant')).toBe('HELLO_WORLD_TEST');
  });
});

describe('Text Diff', () => {
  it('detects identical text', () => {
    const res = computeDiff('hello\nworld', 'hello\nworld');
    expect(res.identical).toBe(true);
    expect(res.additions).toBe(0);
    expect(res.deletions).toBe(0);
  });

  it('detects added and removed lines', () => {
    const res = computeDiff('line1\nline2', 'line1\nline3');
    expect(res.identical).toBe(false);
    expect(res.additions).toBe(1);
    expect(res.deletions).toBe(1);
  });
});

describe('Password Generator & Security', () => {
  it('generates password of desired length', () => {
    const pwd = generatePassword({
      length: 16,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    });
    expect(pwd.length).toBe(16);
    expect(evaluatePasswordStrength(pwd).score).toBeGreaterThanOrEqual(3);
  });

  it('computes sha256 hash', async () => {
    const hash = await computeHash('hello', 'SHA-256');
    expect(hash).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
  });
});

describe('Base64 and CSV/JSON', () => {
  it('roundtrips utf-8 text in base64', () => {
    const raw = 'Hello World! ✨ 123';
    const b64 = textToBase64(raw);
    expect(base64ToText(b64)).toBe(raw);
  });

  it('parses CSV to JSON and back to CSV', () => {
    const csv = 'name,age,city\nAlice,30,London\nBob,25,Paris';
    const { data } = csvToJson(csv);
    expect(data.length).toBe(2);
    expect(data[0].name).toBe('Alice');

    const { csv: outputCsv } = jsonToCsv(JSON.stringify(data));
    expect(outputCsv).toContain('Alice');
    expect(outputCsv).toContain('London');
  });
});

describe('Timestamp Converter', () => {
  it('parses unix epoch timestamp in seconds', () => {
    const parsed = parseTimestampInput(1700000000);
    expect(parsed).not.toBeNull();
    expect(parsed?.seconds).toBe(1700000000);
    expect(parsed?.isoUtc).toBe('2023-11-14T22:13:20.000Z');
  });

  it('creates timestamp from date components', () => {
    const parsed = dateToTimestamp(2023, 11, 14, 22, 13, 20, true);
    expect(parsed.seconds).toBe(1700000000);
  });
});

describe('Color Converter', () => {
  it('parses hex to rgb, hsl, hsv, cmyk', () => {
    const col = parseHexColor('#FF0000');
    expect(col).not.toBeNull();
    expect(col?.rgb).toEqual({ r: 255, g: 0, b: 0 });
    expect(col?.hsl).toEqual({ h: 0, s: 100, l: 50 });
  });

  it('computes contrast ratio correctly', () => {
    const white = { r: 255, g: 255, b: 255 };
    const black = { r: 0, g: 0, b: 0 };
    expect(getContrastRatio(white, black)).toBe(21);
  });
});

describe('Markdown Parser', () => {
  it('parses headings and bold formatting', () => {
    const res = parseMarkdown('# Hello\n\n**world**');
    expect(res).toContain('<h1');
    expect(res).toContain('<strong');
    expect(res).toContain('world');
  });
});

describe('Regex Tester', () => {
  it('matches expressions with capture groups', () => {
    const res = testRegex('(\\w+)@(\\w+\\.\\w+)', 'g', 'Contact support@example.com today');
    expect(res.isValid).toBe(true);
    expect(res.matches.length).toBe(1);
    expect(res.matches[0].groups[0]).toBe('support');
    expect(res.matches[0].groups[1]).toBe('example.com');
  });

  it('handles invalid regex safely without crashing', () => {
    const res = testRegex('[a-z(', 'g', 'test');
    expect(res.isValid).toBe(false);
    expect(res.errorMessage).toBeDefined();
  });
});
