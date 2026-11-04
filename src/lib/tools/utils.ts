/**
 * Pure framework-free logic for 8 new utility tools.
 */

// --- 1. Number Base Converter ---
export interface BaseConvertResult {
  decimal: string;
  binary: string;
  octal: string;
  hex: string;
  error?: string;
}

export function convertBase(input: string, fromBase: number): BaseConvertResult {
  const empty: BaseConvertResult = { decimal: '', binary: '', octal: '', hex: '' };
  if (!input.trim()) return empty;
  try {
    const dec = parseInt(input.trim(), fromBase);
    if (isNaN(dec)) return { ...empty, error: `Invalid number for base ${fromBase}` };
    if (dec < 0 || dec > Number.MAX_SAFE_INTEGER) return { ...empty, error: 'Number out of safe range' };
    return {
      decimal: dec.toString(10),
      binary: dec.toString(2),
      octal: dec.toString(8),
      hex: dec.toString(16).toUpperCase(),
    };
  } catch {
    return { ...empty, error: 'Conversion failed' };
  }
}

// --- 2. Morse Code Converter ---
const MORSE_MAP: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.',
  H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.',
  O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-',
  V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--',
  '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
  ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..__.-',
  '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/',
};

const REVERSE_MORSE = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([k, v]) => [v, k])
);

export function textToMorse(text: string): string {
  if (!text) return '';
  return text
    .toUpperCase()
    .split('')
    .map((c) => MORSE_MAP[c] ?? '?')
    .join(' ');
}

export function morseToText(morse: string): string {
  if (!morse) return '';
  return morse
    .trim()
    .split(' / ')
    .map((word) =>
      word
        .split(' ')
        .map((code) => REVERSE_MORSE[code] ?? '?')
        .join('')
    )
    .join(' ');
}

// --- 3. Aspect Ratio Calculator ---
export interface AspectRatioResult {
  ratio: string;
  simplifiedW: number;
  simplifiedH: number;
  newWidth?: number;
  newHeight?: number;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function calcAspectRatio(
  width: number,
  height: number,
  targetWidth?: number,
  targetHeight?: number
): AspectRatioResult {
  if (width <= 0 || height <= 0) {
    return { ratio: 'N/A', simplifiedW: 0, simplifiedH: 0 };
  }
  const d = gcd(Math.round(width), Math.round(height));
  const sw = width / d;
  const sh = height / d;
  const result: AspectRatioResult = {
    ratio: `${sw}:${sh}`,
    simplifiedW: sw,
    simplifiedH: sh,
  };
  if (targetWidth && targetWidth > 0) {
    result.newHeight = Math.round((targetWidth * height) / width);
    result.newWidth = targetWidth;
  } else if (targetHeight && targetHeight > 0) {
    result.newWidth = Math.round((targetHeight * width) / height);
    result.newHeight = targetHeight;
  }
  return result;
}

// --- 4. CSS Gradient Generator ---
export type GradientType = 'linear' | 'radial' | 'conic';

export interface GradientStop {
  color: string;
  position: number;
}

export interface GradientResult {
  css: string;
  preview: string;
}

export function generateGradientCss(
  type: GradientType,
  angle: number,
  stops: GradientStop[]
): GradientResult {
  if (stops.length === 0) return { css: '', preview: '' };
  const stopStr = stops
    .map((s) => `${s.color} ${s.position}%`)
    .join(', ');
  let css = '';
  if (type === 'linear') {
    css = `linear-gradient(${angle}deg, ${stopStr})`;
  } else if (type === 'radial') {
    css = `radial-gradient(circle, ${stopStr})`;
  } else {
    css = `conic-gradient(from ${angle}deg, ${stopStr})`;
  }
  return { css, preview: `background: ${css};` };
}

// --- 5. Random Number Generator ---
export interface RandomResult {
  values: number[];
  min: number;
  max: number;
  count: number;
  unique: boolean;
}

export function generateRandomNumbers(
  min: number,
  max: number,
  count: number,
  unique: boolean,
  decimals: number
): RandomResult | { error: string } {
  if (min >= max) return { error: 'Min must be less than Max.' };
  const safeCount = Math.max(1, Math.min(1000, count));
  if (unique && safeCount > max - min + 1) {
    return { error: `Cannot generate ${safeCount} unique integers in range [${min}, ${max}].` };
  }
  const factor = Math.pow(10, decimals);
  const values: number[] = [];
  const pool = new Set<number>();

  while (values.length < safeCount) {
    const raw = typeof crypto !== 'undefined'
      ? crypto.getRandomValues(new Uint32Array(1))[0] / 0xffffffff
      : Math.random();
    const val = decimals === 0
      ? Math.floor(raw * (max - min + 1)) + min
      : Math.round((raw * (max - min) + min) * factor) / factor;
    if (unique) {
      if (!pool.has(val)) {
        pool.add(val);
        values.push(val);
      }
    } else {
      values.push(val);
    }
  }
  return { values, min, max, count: safeCount, unique };
}

// --- 6. Character Counter / Frequency ---
export interface CharFrequencyResult {
  total: number;
  letters: number;
  digits: number;
  spaces: number;
  special: number;
  unique: number;
  mostFrequent: { char: string; count: number }[];
  frequency: Record<string, number>;
  avgWordLength: number;
  sentences: number;
  paragraphs: number;
  readingTimeSeconds: number;
}

export function analyzeCharacters(text: string): CharFrequencyResult {
  const frequency: Record<string, number> = {};
  let letters = 0, digits = 0, spaces = 0, special = 0;

  for (const c of text) {
    if (!frequency[c]) frequency[c] = 0;
    frequency[c]++;
    if (/[a-zA-Z]/.test(c)) letters++;
    else if (/\d/.test(c)) digits++;
    else if (/\s/.test(c)) spaces++;
    else special++;
  }

  const sorted = Object.entries(frequency)
    .filter(([k]) => k.trim())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([char, count]) => ({ char, count }));

  const words = text.trim() ? text.trim().split(/\s+/) : [];
  const avgWordLength = words.length
    ? Math.round((words.reduce((s, w) => s + w.length, 0) / words.length) * 10) / 10
    : 0;
  const sentences = (text.match(/[.!?]+/g) || []).length;
  const paragraphs = text.split(/\n\s*\n/).filter(Boolean).length || (text.trim() ? 1 : 0);
  const readingTimeSeconds = Math.ceil(words.length / 3.33);

  return {
    total: text.length,
    letters,
    digits,
    spaces,
    special,
    unique: Object.keys(frequency).length,
    mostFrequent: sorted,
    frequency,
    avgWordLength,
    sentences,
    paragraphs,
    readingTimeSeconds,
  };
}

// --- 7. Cron Expression Builder ---
export interface CronField {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DOW_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function parseCronExpression(cron: string): { fields: CronField; error?: string } {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) {
    return { fields: { minute: '*', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' }, error: 'Must have exactly 5 fields' };
  }
  return { fields: { minute: parts[0], hour: parts[1], dayOfMonth: parts[2], month: parts[3], dayOfWeek: parts[4] } };
}

function describeField(val: string, unit: string, names?: string[]): string {
  if (val === '*') return `every ${unit}`;
  if (val.startsWith('*/')) return `every ${val.slice(2)} ${unit}s`;
  if (val.includes('-')) {
    const [a, b] = val.split('-');
    const na = names ? names[+a] || a : a;
    const nb = names ? names[+b] || b : b;
    return `${na} to ${nb}`;
  }
  if (val.includes(',')) {
    return val
      .split(',')
      .map((v) => (names ? names[+v] || v : v))
      .join(', ');
  }
  return names ? names[+val] || val : val;
}

export function describeCron(fields: CronField): string {
  const { minute, hour, dayOfMonth, month, dayOfWeek } = fields;
  const parts: string[] = [];

  if (minute === '0' && hour === '0' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
    return 'Every day at midnight (00:00)';
  }
  if (minute === '0' && hour === '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
    return 'At the start of every hour';
  }
  if (minute === '*' && hour === '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
    return 'Every minute';
  }

  parts.push(`Minute: ${describeField(minute, 'minute')}`);
  parts.push(`Hour: ${describeField(hour, 'hour')}`);
  parts.push(`Day of month: ${describeField(dayOfMonth, 'day')}`);
  parts.push(`Month: ${describeField(month, 'month', MONTH_NAMES)}`);
  parts.push(`Day of week: ${describeField(dayOfWeek, 'day', DOW_NAMES)}`);

  return parts.join(' | ');
}

export function buildCronExpression(fields: CronField): string {
  return `${fields.minute} ${fields.hour} ${fields.dayOfMonth} ${fields.month} ${fields.dayOfWeek}`;
}

// --- 8. Text to Speech Helper (pure logic only, TTS is Web API) ---
export interface SpeechOptions {
  rate: number;    // 0.1 - 10
  pitch: number;   // 0 - 2
  volume: number;  // 0 - 1
  lang: string;
}

export function getDefaultSpeechOptions(): SpeechOptions {
  return { rate: 1, pitch: 1, volume: 1, lang: 'en-US' };
}

export function clampSpeechOptions(opts: SpeechOptions): SpeechOptions {
  return {
    rate: Math.max(0.1, Math.min(10, opts.rate)),
    pitch: Math.max(0, Math.min(2, opts.pitch)),
    volume: Math.max(0, Math.min(1, opts.volume)),
    lang: opts.lang || 'en-US',
  };
}

