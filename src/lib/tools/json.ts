export interface JSONParseError {
  message: string;
  line: number;
  column: number;
}

export type JSONIndent = 2 | 4 | '\t';

function sortKeysDeep(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(sortKeysDeep);
  } else if (obj !== null && typeof obj === 'object') {
    const keys = Object.keys(obj).sort();
    const sorted: Record<string, unknown> = {};
    for (const key of keys) {
      sorted[key] = sortKeysDeep((obj as Record<string, unknown>)[key]);
    }
    return sorted;
  }
  return obj;
}

export function parseJSONWithLocation(rawText: string): {
  success: boolean;
  data?: unknown;
  error?: JSONParseError;
} {
  try {
    const data = JSON.parse(rawText);
    return { success: true, data };
  } catch (err: unknown) {
    let message = 'Invalid JSON syntax';
    let line = 1;
    let column = 1;

    if (err instanceof Error) {
      message = err.message;
      // Many modern engines (V8, Safari) give position: "at position X" or "line X column Y"
      const posMatch = message.match(/at position (\d+)/i);
      const lineColMatch = message.match(/line (\d+) column (\d+)/i);

      if (lineColMatch) {
        line = parseInt(lineColMatch[1], 10);
        column = parseInt(lineColMatch[2], 10);
      } else if (posMatch) {
        const offset = parseInt(posMatch[1], 10);
        const prefix = rawText.slice(0, offset);
        const lines = prefix.split('\n');
        line = lines.length;
        column = lines[lines.length - 1].length + 1;
      }
    }

    return {
      success: false,
      error: { message, line, column },
    };
  }
}

export function formatJSON(
  rawText: string,
  indent: JSONIndent = 2,
  sortKeys = false
): { success: boolean; formatted?: string; error?: JSONParseError } {
  const parsed = parseJSONWithLocation(rawText);
  if (!parsed.success || parsed.data === undefined) {
    return { success: false, error: parsed.error };
  }

  const processedData = sortKeys ? sortKeysDeep(parsed.data) : parsed.data;
  const formatted = JSON.stringify(processedData, null, indent);
  return { success: true, formatted };
}

export function minifyJSON(rawText: string): {
  success: boolean;
  minified?: string;
  error?: JSONParseError;
} {
  const parsed = parseJSONWithLocation(rawText);
  if (!parsed.success || parsed.data === undefined) {
    return { success: false, error: parsed.error };
  }

  const minified = JSON.stringify(parsed.data);
  return { success: true, minified };
}

