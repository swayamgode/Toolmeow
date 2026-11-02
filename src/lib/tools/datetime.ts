/**
 * Pure framework-free logic for Unix Timestamp & Epoch conversions
 */

export interface ParsedTimestamp {
  seconds: number;
  milliseconds: number;
  isoUtc: string;
  localFormatted: string;
  relative: string;
  dayOfWeek: string;
  timezoneOffset: string;
}

export function parseTimestampInput(input: string | number): ParsedTimestamp | null {
  if (input === '' || input === null || input === undefined) return null;

  let ms: number;
  const num = typeof input === 'number' ? input : Number(input.trim());

  if (!isNaN(num)) {
    // If fewer than 11 digits, assume seconds (standard epoch)
    if (Math.abs(num) < 1e11) {
      ms = Math.round(num * 1000);
    } else {
      ms = Math.round(num);
    }
  } else {
    // Try parsing as ISO or human date string
    const dateObj = new Date(String(input));
    if (isNaN(dateObj.getTime())) return null;
    ms = dateObj.getTime();
  }

  const d = new Date(ms);
  if (isNaN(d.getTime())) return null;

  const seconds = Math.floor(ms / 1000);
  const isoUtc = d.toISOString();
  const localFormatted = d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  });

  const dayOfWeek = d.toLocaleDateString(undefined, { weekday: 'long' });

  const offsetMinutes = -d.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const absOffset = Math.abs(offsetMinutes);
  const offsetHours = String(Math.floor(absOffset / 60)).padStart(2, '0');
  const offsetMins = String(absOffset % 60).padStart(2, '0');
  const timezoneOffset = `UTC${sign}${offsetHours}:${offsetMins}`;

  return {
    seconds,
    milliseconds: ms,
    isoUtc,
    localFormatted,
    relative: formatRelativeTime(ms),
    dayOfWeek,
    timezoneOffset,
  };
}

export function dateToTimestamp(year: number, month: number, day: number, hours = 0, minutes = 0, seconds = 0, isUtc = false): ParsedTimestamp {
  const d = isUtc
    ? new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds))
    : new Date(year, month - 1, day, hours, minutes, seconds);

  return parseTimestampInput(d.getTime())!;
}

function formatRelativeTime(targetMs: number): string {
  const now = Date.now();
  const diffSec = Math.round((targetMs - now) / 1000);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const absDiff = Math.abs(diffSec);

  if (absDiff < 60) {
    return rtf.format(diffSec, 'second');
  } else if (absDiff < 3600) {
    return rtf.format(Math.round(diffSec / 60), 'minute');
  } else if (absDiff < 86400) {
    return rtf.format(Math.round(diffSec / 3600), 'hour');
  } else if (absDiff < 2592000) {
    return rtf.format(Math.round(diffSec / 86400), 'day');
  } else if (absDiff < 31536000) {
    return rtf.format(Math.round(diffSec / 2592000), 'month');
  }
  return rtf.format(Math.round(diffSec / 31536000), 'year');
}

