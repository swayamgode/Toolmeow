/**
 * Pure framework-free logic for utility tools batch 4.
 */

// --- 1. BMI Calculator ---
export type BmiUnit = 'metric' | 'imperial';

export interface BmiResult {
  bmi: number;
  category: string;
  idealWeightMin: number;
  idealWeightMax: number;
  unit: BmiUnit;
}

export function calcBmi(weight: number, height: number, unit: BmiUnit): BmiResult | { error: string } {
  if (weight <= 0 || height <= 0) return { error: 'Weight and height must be positive.' };

  let bmi: number;
  let idealMin: number;
  let idealMax: number;

  if (unit === 'metric') {
    // weight in kg, height in cm
    const hm = height / 100;
    bmi = weight / (hm * hm);
    idealMin = 18.5 * hm * hm;
    idealMax = 24.9 * hm * hm;
  } else {
    // weight in lbs, height in inches
    bmi = (703 * weight) / (height * height);
    idealMin = (18.5 * height * height) / 703;
    idealMax = (24.9 * height * height) / 703;
  }

  let category: string;
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal weight';
  else if (bmi < 30) category = 'Overweight';
  else if (bmi < 35) category = 'Obese (Class I)';
  else if (bmi < 40) category = 'Obese (Class II)';
  else category = 'Obese (Class III)';

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    idealWeightMin: Math.round(idealMin * 10) / 10,
    idealWeightMax: Math.round(idealMax * 10) / 10,
    unit,
  };
}

// --- 2. Tip Calculator ---
export interface TipResult {
  tipAmount: number;
  totalBill: number;
  perPerson: number;
  tipPerPerson: number;
}

export function calcTip(bill: number, tipPercent: number, people: number): TipResult | { error: string } {
  if (bill < 0) return { error: 'Bill amount cannot be negative.' };
  if (tipPercent < 0) return { error: 'Tip percentage cannot be negative.' };
  if (people < 1) return { error: 'Number of people must be at least 1.' };

  const tipAmount = bill * (tipPercent / 100);
  const totalBill = bill + tipAmount;
  const perPerson = totalBill / people;
  const tipPerPerson = tipAmount / people;

  return {
    tipAmount: Math.round(tipAmount * 100) / 100,
    totalBill: Math.round(totalBill * 100) / 100,
    perPerson: Math.round(perPerson * 100) / 100,
    tipPerPerson: Math.round(tipPerPerson * 100) / 100,
  };
}

// --- 3. Temperature Converter ---
export type TempUnit = 'celsius' | 'fahrenheit' | 'kelvin' | 'rankine';

export interface TempResult {
  celsius: number;
  fahrenheit: number;
  kelvin: number;
  rankine: number;
}

export function convertTemperature(value: number, from: TempUnit): TempResult {
  let c: number;
  switch (from) {
    case 'celsius': c = value; break;
    case 'fahrenheit': c = (value - 32) * (5 / 9); break;
    case 'kelvin': c = value - 273.15; break;
    case 'rankine': c = (value - 491.67) * (5 / 9); break;
    default: c = value;
  }
  const r = (n: number) => Math.round(n * 10000) / 10000;
  return {
    celsius: r(c),
    fahrenheit: r(c * (9 / 5) + 32),
    kelvin: r(c + 273.15),
    rankine: r((c + 273.15) * (9 / 5)),
  };
}

// --- 4. Binary ↔ Text Converter ---
export function textToBinary(text: string): string {
  if (!text) return '';
  return text
    .split('')
    .map((c) => c.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

export function binaryToText(binary: string): string {
  if (!binary.trim()) return '';
  const groups = binary.trim().split(/\s+/);
  try {
    return groups
      .map((b) => {
        const code = parseInt(b, 2);
        if (isNaN(code)) throw new Error(`Invalid binary: ${b}`);
        return String.fromCharCode(code);
      })
      .join('');
  } catch {
    return 'Error: invalid binary input';
  }
}

// --- 5. String Utilities ---
export interface StringStats {
  reversed: string;
  slug: string;
  palindrome: boolean;
  trimmed: string;
  noExtraSpaces: string;
  camelCase: string;
  snakeCase: string;
  titleCase: string;
  charCount: number;
  wordCount: number;
}

export function analyzeString(text: string): StringStats {
  const trimmed = text.trim();
  const reversed = text.split('').reverse().join('');
  const slug = trimmed
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const stripped = trimmed.replace(/\s+/g, '');
  const palindrome = stripped.toLowerCase() === stripped.split('').reverse().join('').toLowerCase();

  const noExtraSpaces = trimmed.replace(/\s+/g, ' ');
  const words = noExtraSpaces.split(' ').filter(Boolean);

  const camelCase = words
    .map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');

  const snakeCase = words.map((w) => w.toLowerCase()).join('_');

  const titleCase = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

  return {
    reversed,
    slug,
    palindrome,
    trimmed,
    noExtraSpaces,
    camelCase,
    snakeCase,
    titleCase,
    charCount: text.length,
    wordCount: words.length,
  };
}

// --- 6. XML Formatter ---
export function formatXml(xml: string, indent: number = 2): string {
  if (!xml.trim()) return '';
  const pad = ' '.repeat(indent);
  let formatted = '';
  let depth = 0;

  const tokens = xml
    .replace(/>\s*</g, '><')
    .replace(/</g, '\n<')
    .split('\n')
    .filter((t) => t.trim());

  for (const token of tokens) {
    const t = token.trim();
    if (!t) continue;

    // Closing tag
    if (/^<\//.test(t)) {
      depth = Math.max(0, depth - 1);
      formatted += pad.repeat(depth) + t + '\n';
    }
    // Self-closing or processing instruction or doctype
    else if (/\/>$/.test(t) || /^<\?/.test(t) || /^<!/.test(t)) {
      formatted += pad.repeat(depth) + t + '\n';
    }
    // Opening tag
    else if (/^<[^/]/.test(t)) {
      formatted += pad.repeat(depth) + t + '\n';
      if (!/\/>$/.test(t) && !/^<\?/.test(t)) depth++;
    }
    // Text content
    else {
      formatted += pad.repeat(depth) + t + '\n';
    }
  }

  return formatted.trim();
}

export function minifyXml(xml: string): string {
  if (!xml.trim()) return '';
  return xml
    .replace(/>\s+</g, '><')
    .replace(/\s+/g, ' ')
    .replace(/> </g, '><')
    .replace(/\s+<\//g, '</')
    .trim();
}

export function validateXml(xml: string): { valid: boolean; error?: string } {
  if (!xml.trim()) return { valid: false, error: 'Empty input' };
  try {
    if (typeof DOMParser !== 'undefined') {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'application/xml');
      const err = doc.querySelector('parsererror');
      if (err) return { valid: false, error: err.textContent ?? 'Parse error' };
      return { valid: true };
    }
    return { valid: true };
  } catch (e) {
    return { valid: false, error: String(e) };
  }
}

// --- 7. Roman Numeral Converter ---
const ROMAN_VALS: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

export function intToRoman(num: number): string {
  if (num < 1 || num > 3999 || !Number.isInteger(num)) return 'Invalid (1–3999 only)';
  let result = '';
  let n = num;
  for (const [val, sym] of ROMAN_VALS) {
    while (n >= val) { result += sym; n -= val; }
  }
  return result;
}

export function romanToInt(roman: string): number | null {
  const r = roman.toUpperCase().trim();
  if (!r) return null;
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let result = 0;
  for (let i = 0; i < r.length; i++) {
    const cur = map[r[i]];
    const next = map[r[i + 1]];
    if (cur === undefined) return null;
    if (next && cur < next) result -= cur;
    else result += cur;
  }
  return result > 0 ? result : null;
}

