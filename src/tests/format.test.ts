import { describe, it, expect } from 'vitest';
import { formatNumberIN, formatCurrencyIN, formatBytes, formatPercent } from '@/lib/format';

describe('format utilities', () => {
  it('formats en-IN numbers correctly', () => {
    expect(formatNumberIN(1000000)).toBe('10,00,000');
    expect(formatNumberIN(12345.67)).toBe('12,345.67');
  });

  it('formats en-IN currency correctly', () => {
    const formatted = formatCurrencyIN(100000);
    expect(formatted).toContain('1,00,000');
    expect(formatted).toContain('₹');
  });

  it('formats bytes correctly', () => {
    expect(formatBytes(1024)).toBe('1 KB');
    expect(formatBytes(1048576)).toBe('1 MB');
    expect(formatBytes(0)).toBe('0 B');
  });

  it('formats percentages correctly', () => {
    expect(formatPercent(25.5)).toBe('25.5%');
    expect(formatPercent(100)).toBe('100%');
  });
});

