import { describe, it, expect } from 'vitest';
import { calcBmi, calcTip, convertTemperature, textToBinary, binaryToText, analyzeString, formatXml, minifyXml, intToRoman, romanToInt } from '@/lib/tools/utilities';

describe('Utility Tools Batch 4', () => {
  it('calcBmi calculates BMI and category', () => {
    const res = calcBmi(70, 175, 'metric');
    expect('bmi' in res).toBe(true);
    if ('bmi' in res) {
      expect(res.bmi).toBe(22.9);
      expect(res.category).toBe('Normal weight');
    }
  });

  it('calcTip splits bills accurately', () => {
    const res = calcTip(100, 20, 2);
    expect('totalBill' in res).toBe(true);
    if ('totalBill' in res) {
      expect(res.tipAmount).toBe(20);
      expect(res.totalBill).toBe(120);
      expect(res.perPerson).toBe(60);
    }
  });

  it('convertTemperature converts temperatures', () => {
    const res = convertTemperature(100, 'celsius');
    expect(res.fahrenheit).toBe(212);
    expect(res.kelvin).toBe(373.15);
  });

  it('textToBinary and binaryToText perform lossless roundtrip', () => {
    const text = 'ToolMeow';
    const binary = textToBinary(text);
    expect(binaryToText(binary)).toBe(text);
  });

  it('analyzeString computes slug and palindrome correctly', () => {
    const stats = analyzeString('Racecar');
    expect(stats.palindrome).toBe(true);
    expect(stats.slug).toBe('racecar');
    expect(stats.reversed).toBe('racecaR');
  });

  it('formatXml and minifyXml work properly', () => {
    const raw = '<root><user>Alex</user></root>';
    const formatted = formatXml(raw);
    expect(formatted).toContain('\n');
    expect(minifyXml(formatted)).toBe(raw);
  });

  it('intToRoman and romanToInt handle conversions', () => {
    expect(intToRoman(2024)).toBe('MMXXIV');
    expect(romanToInt('MMXXIV')).toBe(2024);
    expect(intToRoman(3999)).toBe('MMMCMXCIX');
    expect(romanToInt('MMMCMXCIX')).toBe(3999);
  });
});
