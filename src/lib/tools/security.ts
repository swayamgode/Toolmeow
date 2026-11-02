/**
 * Pure framework-free logic for Password Generation and Hash Generation
 */

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous?: boolean;
}

const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const AMBIGUOUS_CHARS = /[il1Lo0OI]/g;

export function generatePassword(options: PasswordOptions): string {
  const { length, uppercase, lowercase, numbers, symbols, excludeAmbiguous } = options;

  let pool = '';
  const requiredChars: string[] = [];

  let uppers = UPPERCASE_CHARS;
  let lowers = LOWERCASE_CHARS;
  let nums = NUMBER_CHARS;
  let syms = SYMBOL_CHARS;

  if (excludeAmbiguous) {
    uppers = uppers.replace(AMBIGUOUS_CHARS, '');
    lowers = lowers.replace(AMBIGUOUS_CHARS, '');
    nums = nums.replace(AMBIGUOUS_CHARS, '');
    syms = syms.replace(AMBIGUOUS_CHARS, '');
  }

  if (uppercase && uppers) {
    pool += uppers;
    requiredChars.push(getRandomChar(uppers));
  }
  if (lowercase && lowers) {
    pool += lowers;
    requiredChars.push(getRandomChar(lowers));
  }
  if (numbers && nums) {
    pool += nums;
    requiredChars.push(getRandomChar(nums));
  }
  if (symbols && syms) {
    pool += syms;
    requiredChars.push(getRandomChar(syms));
  }

  if (pool.length === 0) {
    return '';
  }

  const result: string[] = [...requiredChars];
  const targetLength = Math.max(result.length, length);

  const randomValues = new Uint32Array(targetLength - result.length);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(randomValues);
  } else {
    for (let i = 0; i < randomValues.length; i++) {
      randomValues[i] = Math.floor(Math.random() * 0xffffffff);
    }
  }

  for (let i = 0; i < randomValues.length; i++) {
    const idx = randomValues[i] % pool.length;
    result.push(pool[idx]);
  }

  // Fisher-Yates shuffle
  for (let i = result.length - 1; i > 0; i--) {
    let randIdx = 0;
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const buf = new Uint32Array(1);
      crypto.getRandomValues(buf);
      randIdx = buf[0] % (i + 1);
    } else {
      randIdx = Math.floor(Math.random() * (i + 1));
    }
    const temp = result[i];
    result[i] = result[randIdx];
    result[randIdx] = temp;
  }

  return result.slice(0, targetLength).join('');
}

function getRandomChar(str: string): string {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return str[buf[0] % str.length];
  }
  return str[Math.floor(Math.random() * str.length)];
}

export interface PasswordStrength {
  score: number; // 0 to 4
  label: 'Very Weak' | 'Weak' | 'Medium' | 'Strong' | 'Very Strong';
  entropy: number;
}

export function evaluatePasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return { score: 0, label: 'Very Weak', entropy: 0 };
  }

  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

  const entropy = Math.round(password.length * (poolSize > 0 ? Math.log2(poolSize) : 0));

  let score = 0;
  if (entropy > 80 && password.length >= 12) score = 4;
  else if (entropy > 60 && password.length >= 10) score = 3;
  else if (entropy > 40 && password.length >= 8) score = 2;
  else if (entropy > 20) score = 1;

  const labels: PasswordStrength['label'][] = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  return {
    score,
    label: labels[score],
    entropy,
  };
}

export type HashAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

export async function computeHash(text: string, algorithm: HashAlgorithm): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

