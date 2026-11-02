/**
 * Formatting utilities for ToolMeow (en-IN defaults, byte formatting, numbers)
 */

export function formatNumberIN(value: number, maximumFractionDigits = 2): string {
  if (!Number.isFinite(value)) return '0';
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatCurrencyIN(
  value: number,
  options?: { maximumFractionDigits?: number; hideSymbol?: boolean }
): string {
  if (!Number.isFinite(value)) return options?.hideSymbol ? '0.00' : '₹0.00';
  const maxDigits = options?.maximumFractionDigits ?? 2;
  const formatted = new Intl.NumberFormat('en-IN', {
    style: options?.hideSymbol ? 'decimal' : 'currency',
    currency: 'INR',
    maximumFractionDigits: maxDigits,
    minimumFractionDigits: maxDigits > 0 ? 2 : 0,
  }).format(value);
  return formatted;
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const safeI = Math.min(i, sizes.length - 1);
  return `${parseFloat((bytes / Math.pow(k, safeI)).toFixed(dm))} ${sizes[safeI]}`;
}

export function formatPercent(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return '0%';
  return `${parseFloat(value.toFixed(decimals))}%`;
}

export function formatDate(dateString: string | Date, locale = 'en-IN'): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

