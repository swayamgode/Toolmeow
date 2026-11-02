/**
 * Pure framework-free logic for Regular Expression Testing
 */

export interface RegexMatch {
  index: number;
  length: number;
  match: string;
  groups: string[];
}

export interface RegexTestResult {
  isValid: boolean;
  errorMessage?: string;
  matches: RegexMatch[];
  replacedText?: string;
  executionTimeMs: number;
}

export function testRegex(
  pattern: string,
  flags: string,
  testString: string,
  replacement?: string
): RegexTestResult {
  const start = performance.now();

  if (!pattern) {
    return {
      isValid: true,
      matches: [],
      executionTimeMs: 0,
      replacedText: testString,
    };
  }

  let regex: RegExp;
  try {
    regex = new RegExp(pattern, flags);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Invalid regular expression';
    return {
      isValid: false,
      errorMessage: msg,
      matches: [],
      executionTimeMs: 0,
    };
  }

  const matches: RegexMatch[] = [];

  try {
    if (regex.global) {
      let m: RegExpExecArray | null;
      let count = 0;
      // Guard against infinite loop with 0-length matches
      while ((m = regex.exec(testString)) !== null && count < 1000) {
        matches.push({
          index: m.index,
          length: m[0].length,
          match: m[0],
          groups: m.slice(1),
        });
        if (m[0].length === 0) {
          regex.lastIndex++;
        }
        count++;
      }
    } else {
      const m = regex.exec(testString);
      if (m) {
        matches.push({
          index: m.index,
          length: m[0].length,
          match: m[0],
          groups: m.slice(1),
        });
      }
    }

    let replacedText: string | undefined;
    if (replacement !== undefined) {
      replacedText = testString.replace(regex, replacement);
    }

    const duration = performance.now() - start;
    return {
      isValid: true,
      matches,
      replacedText,
      executionTimeMs: Math.round(duration * 100) / 100,
    };
  } catch (err: unknown) {
    return {
      isValid: false,
      errorMessage: err instanceof Error ? err.message : 'Regex execution failed',
      matches: [],
      executionTimeMs: 0,
    };
  }
}

