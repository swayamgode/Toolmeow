/**
 * Pure framework-free logic for Base64 Encoding/Decoding and CSV <-> JSON Conversion
 */

export function textToBase64(text: string): string {
  if (!text) return '';
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function base64ToText(base64: string): string {
  if (!base64) return '';
  const clean = base64.trim().replace(/\s+/g, '');
  const binary = atob(clean);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

/**
 * Robust RFC 4180 compliant CSV parser
 */
export function csvToJson(csv: string, delimiter = ','): { data: Record<string, string>[]; error?: string } {
  if (!csv.trim()) {
    return { data: [] };
  }

  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentVal = '';
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const nextChar = csv[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      currentRow.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentVal.trim());
      currentVal = '';
      if (currentRow.length > 0 && currentRow.some((c) => c !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentVal += char;
    }
  }

  if (currentVal || currentRow.length > 0) {
    currentRow.push(currentVal.trim());
    if (currentRow.length > 0 && currentRow.some((c) => c !== '')) {
      rows.push(currentRow);
    }
  }

  if (rows.length < 2) {
    return { data: [], error: 'CSV requires at least a header row and one data row.' };
  }

  const headers = rows[0];
  const data = rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h || `col_${idx + 1}`] = row[idx] ?? '';
    });
    return obj;
  });

  return { data };
}

/**
 * Robust JSON to CSV serializer
 */
export function jsonToCsv(jsonStr: string, delimiter = ','): { csv: string; error?: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid JSON format';
    return { csv: '', error: `Invalid JSON: ${message}` };
  }

  if (!Array.isArray(parsed)) {
    if (typeof parsed === 'object' && parsed !== null) {
      parsed = [parsed];
    } else {
      return { csv: '', error: 'JSON must be an array of objects or an object.' };
    }
  }

  const list = parsed as Record<string, unknown>[];
  if (list.length === 0) {
    return { csv: '' };
  }

  const headers = Array.from(
    new Set(list.flatMap((item) => (typeof item === 'object' && item !== null ? Object.keys(item) : [])))
  );

  if (headers.length === 0) {
    return { csv: '', error: 'No object properties found to format as CSV columns.' };
  }

  const escapeVal = (val: unknown): string => {
    if (val === null || val === undefined) return '';
    const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
    if (str.includes(delimiter) || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const headerLine = headers.map((h) => escapeVal(h)).join(delimiter);
  const rows = list.map((item) =>
    headers.map((h) => escapeVal(item ? item[h] : '')).join(delimiter)
  );

  return { csv: [headerLine, ...rows].join('\n') };
}

