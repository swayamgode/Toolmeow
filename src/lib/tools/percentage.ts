export type PercentageMode =
  | 'percentOf'
  | 'isWhatPercentOf'
  | 'percentageChange'
  | 'increaseByPercent'
  | 'decreaseByPercent'
  | 'reversePercent';

export function calculatePercentOf(percent: number, base: number): number {
  return (percent / 100) * base;
}

export function calculateIsWhatPercentOf(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

export function calculatePercentageChange(fromValue: number, toValue: number): number {
  if (fromValue === 0) return 0;
  return ((toValue - fromValue) / fromValue) * 100;
}

export function calculateIncreaseByPercent(base: number, percent: number): number {
  const result = base + (base * percent) / 100;
  return Math.round(result * 1e10) / 1e10;
}

export function calculateDecreaseByPercent(base: number, percent: number): number {
  const result = base - (base * percent) / 100;
  return Math.round(result * 1e10) / 1e10;
}

export function calculateReversePercent(finalValue: number, percent: number): number {
  if (percent === 0) return 0;
  return (finalValue / percent) * 100;
}
