/**
 * Pure framework-free logic for Case Converter and Text Diff
 */

export type CaseType =
  | 'upper'
  | 'lower'
  | 'title'
  | 'sentence'
  | 'camel'
  | 'snake'
  | 'kebab'
  | 'pascal'
  | 'constant'
  | 'alternating';

export function convertCase(text: string, type: CaseType): string {
  if (!text) return '';

  switch (type) {
    case 'upper':
      return text.toUpperCase();

    case 'lower':
      return text.toLowerCase();

    case 'title':
      return text.replace(/\b\w+/g, (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      });

    case 'sentence': {
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    }

    case 'camel': {
      const words = extractWords(text);
      if (words.length === 0) return '';
      return (
        words[0].toLowerCase() +
        words
          .slice(1)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join('')
      );
    }

    case 'pascal': {
      const words = extractWords(text);
      return words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join('');
    }

    case 'snake': {
      const words = extractWords(text);
      return words.map((w) => w.toLowerCase()).join('_');
    }

    case 'kebab': {
      const words = extractWords(text);
      return words.map((w) => w.toLowerCase()).join('-');
    }

    case 'constant': {
      const words = extractWords(text);
      return words.map((w) => w.toUpperCase()).join('_');
    }

    case 'alternating': {
      let upper = true;
      return text
        .split('')
        .map((char) => {
          if (/[a-zA-Z]/.test(char)) {
            const res = upper ? char.toUpperCase() : char.toLowerCase();
            upper = !upper;
            return res;
          }
          return char;
        })
        .join('');
    }

    default:
      return text;
  }
}

function extractWords(str: string): string[] {
  // Handles camelCase, kebab-case, snake_case, spaces
  return (
    str
      .replace(/([a-z\d])([A-Z])/g, '$1 $2')
      .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 $2')
      .match(/[a-zA-Z0-9]+/g) || []
  );
}

export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  value: string;
  leftLineNum?: number;
  rightLineNum?: number;
}

export interface DiffResult {
  lines: DiffLine[];
  additions: number;
  deletions: number;
  identical: boolean;
}

/**
 * Line-by-line diff algorithm using Longest Common Subsequence (LCS)
 */
export function computeDiff(original: string, modified: string): DiffResult {
  const origLines = original ? original.split(/\r?\n/) : [];
  const modLines = modified ? modified.split(/\r?\n/) : [];

  if (original === modified) {
    return {
      lines: origLines.map((line, idx) => ({
        type: 'unchanged',
        value: line,
        leftLineNum: idx + 1,
        rightLineNum: idx + 1,
      })),
      additions: 0,
      deletions: 0,
      identical: true,
    };
  }

  const n = origLines.length;
  const m = modLines.length;

  // LCS Matrix
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (origLines[i - 1] === modLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find diff
  const lines: DiffLine[] = [];
  let i = n;
  let j = m;
  let additions = 0;
  let deletions = 0;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && origLines[i - 1] === modLines[j - 1]) {
      lines.unshift({
        type: 'unchanged',
        value: origLines[i - 1],
        leftLineNum: i,
        rightLineNum: j,
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      lines.unshift({
        type: 'added',
        value: modLines[j - 1],
        rightLineNum: j,
      });
      additions++;
      j--;
    } else if (i > 0) {
      lines.unshift({
        type: 'removed',
        value: origLines[i - 1],
        leftLineNum: i,
      });
      deletions++;
      i--;
    }
  }

  return {
    lines,
    additions,
    deletions,
    identical: additions === 0 && deletions === 0,
  };
}

