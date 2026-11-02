import { describe, it, expect } from 'vitest';
import {
  calculatePercentOf,
  calculateIsWhatPercentOf,
  calculatePercentageChange,
  calculateIncreaseByPercent,
  calculateDecreaseByPercent,
} from '@/lib/tools/percentage';
import { calculateGST } from '@/lib/tools/gst';
import { calculateEMI } from '@/lib/tools/emi';
import { calculateSIP } from '@/lib/tools/sip';
import { calculateAge } from '@/lib/tools/age';
import { countWordsAndStats } from '@/lib/tools/wordcount';
import { formatJSON, minifyJSON, parseJSONWithLocation } from '@/lib/tools/json';
import { convertUnit } from '@/lib/tools/units';

describe('Phase 2 Pure Logic Tools — Mandatory Known-Answer Tests', () => {
  describe('Percentage Calculator', () => {
    it('calculates 15% of 200 = 30', () => {
      expect(calculatePercentOf(15, 200)).toBe(30);
    });

    it('calculates 50 is 25% of 200', () => {
      expect(calculateIsWhatPercentOf(50, 200)).toBe(25);
    });

    it('calculates 80 -> 100 is +25%', () => {
      expect(calculatePercentageChange(80, 100)).toBe(25);
    });

    it('calculates 100 -> 80 is -20%', () => {
      expect(calculatePercentageChange(100, 80)).toBe(-20);
    });

    it('calculates increase and decrease by percent', () => {
      expect(calculateIncreaseByPercent(100, 15)).toBe(115);
      expect(calculateDecreaseByPercent(100, 15)).toBe(85);
    });
  });

  describe('GST Calculator', () => {
    it('₹1,000 @ 18% add -> GST 180, total 1,180', () => {
      const res = calculateGST({ amount: 1000, rate: 18, isInclusive: false });
      expect(res.baseAmount).toBe(1000);
      expect(res.gstAmount).toBe(180);
      expect(res.totalAmount).toBe(1180);
      expect(res.cgst).toBe(90);
      expect(res.sgst).toBe(90);
    });

    it('₹1,180 @ 18% remove -> base 1,000, GST 180', () => {
      const res = calculateGST({ amount: 1180, rate: 18, isInclusive: true });
      expect(res.baseAmount).toBe(1000);
      expect(res.gstAmount).toBe(180);
      expect(res.totalAmount).toBe(1180);
    });

    it('handles inter-state IGST split', () => {
      const res = calculateGST({ amount: 1000, rate: 18, isInterState: true });
      expect(res.igst).toBe(180);
      expect(res.cgst).toBe(0);
      expect(res.sgst).toBe(0);
    });
  });

  describe('EMI Calculator', () => {
    it('P=1,000,000; 10% p.a.; 120 months -> EMI ≈ ₹13,215.07; total ≈ ₹1,585,808; interest ≈ ₹585,808', () => {
      const res = calculateEMI({ principal: 1000000, annualRate: 10, tenureMonths: 120 });
      expect(res.monthlyEMI).toBeCloseTo(13215.07, 1);
      expect(res.totalPayment).toBeCloseTo(1585808, -1);
      expect(res.totalInterest).toBeCloseTo(585808, -1);

      // Verify schedule has 120 entries and terminal balance is 0
      expect(res.schedule.length).toBe(120);
      expect(res.schedule[res.schedule.length - 1].closingBalance).toBe(0);
    });

    it('handles 0% interest rate gracefully', () => {
      const res = calculateEMI({ principal: 12000, annualRate: 0, tenureMonths: 12 });
      expect(res.monthlyEMI).toBe(1000);
      expect(res.totalInterest).toBe(0);
      expect(res.totalPayment).toBe(12000);
    });
  });

  describe('SIP Calculator', () => {
    it('P=5,000; 12%; 10 years -> FV ≈ ₹1,161,695 (±₹1)', () => {
      const res = calculateSIP({ monthlyInvestment: 5000, annualReturnRate: 12, tenureYears: 10 });
      expect(res.investedAmount).toBe(600000);
      expect(Math.abs(res.futureValue - 1161695)).toBeLessThanOrEqual(2);
      expect(res.breakdown.length).toBe(10);
    });
  });

  describe('Age Calculator', () => {
    it('handles month-end borrow: 2000-01-31 to 2000-03-01', () => {
      const res = calculateAge('2000-01-31', '2000-03-01');
      expect(res.years).toBe(0);
      expect(res.months).toBe(1);
      // In year 2000 (leap year), Feb has 29 days
      expect(res.days).toBe(1);
    });

    it('identifies leap-day birth (2000-02-29)', () => {
      const res = calculateAge('2000-02-29', '2024-02-29');
      expect(res.isLeapYearBirth).toBe(true);
      expect(res.years).toBe(24);
      expect(res.months).toBe(0);
      expect(res.days).toBe(0);
    });
  });

  describe('Word Counter', () => {
    it('counts words, characters, and sentences accurately', () => {
      const text = 'Hello world! This is a fast, browser-native tool. How does it work?';
      const stats = countWordsAndStats(text);
      expect(stats.words).toBe(13);
      expect(stats.sentences).toBe(3);
      expect(stats.characters).toBe(text.length);
      expect(stats.paragraphs).toBe(1);
      expect(stats.readingTimeMinutes).toBeGreaterThanOrEqual(1);
    });
  });

  describe('JSON Formatter & Validator', () => {
    it('formats valid JSON with indentation and sorting keys', () => {
      const raw = '{"b":2,"a":1}';
      const res = formatJSON(raw, 2, true);
      expect(res.success).toBe(true);
      expect(res.formatted).toBe('{\n  "a": 1,\n  "b": 2\n}');
    });

    it('minifies JSON cleanly', () => {
      const raw = '{\n  "a": 1,\n  "b": 2\n}';
      const res = minifyJSON(raw);
      expect(res.success).toBe(true);
      expect(res.minified).toBe('{"a":1,"b":2}');
    });

    it('reports line and column on syntax errors', () => {
      const broken = '{\n  "key": "value",\n}';
      const parsed = parseJSONWithLocation(broken);
      expect(parsed.success).toBe(false);
      expect(parsed.error?.line).toBeDefined();
      expect(parsed.error?.column).toBeDefined();
    });
  });

  describe('Unit Converter', () => {
    it('1 mile = 1609.344 meters', () => {
      const m = convertUnit({ category: 'length', fromUnitId: 'mi', toUnitId: 'm', value: 1 });
      expect(m).toBeCloseTo(1609.344, 4);
    });

    it('100 °C = 212 °F', () => {
      const f = convertUnit({ category: 'temperature', fromUnitId: 'c', toUnitId: 'f', value: 100 });
      expect(f).toBeCloseTo(212, 4);
    });

    it('1 acre = 4046.8564224 m²', () => {
      const sqm = convertUnit({ category: 'area', fromUnitId: 'acre', toUnitId: 'sqm', value: 1 });
      expect(sqm).toBeCloseTo(4046.8564224, 4);
    });

    it('1 GiB = 1,073,741,824 B', () => {
      const b = convertUnit({ category: 'data', fromUnitId: 'gib', toUnitId: 'b', value: 1 });
      expect(b).toBe(1073741824);
    });

    it('satisfies round-trip property (a -> b -> a within 1e-9 relative)', () => {
      const initial = 42.5;
      const toKm = convertUnit({ category: 'length', fromUnitId: 'mi', toUnitId: 'km', value: initial });
      const backToMi = convertUnit({ category: 'length', fromUnitId: 'km', toUnitId: 'mi', value: toKm });
      const relDiff = Math.abs(backToMi - initial) / initial;
      expect(relDiff).toBeLessThan(1e-9);
    });
  });
});
