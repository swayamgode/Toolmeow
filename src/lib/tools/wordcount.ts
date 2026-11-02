export interface KeywordFrequency {
  word: string;
  count: number;
  density: number; // percentage (0-100)
}

export interface WordCountResult {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  topKeywords: KeywordFrequency[];
}

const COMMON_STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'to', 'in', 'on', 'of',
  'for', 'with', 'at', 'by', 'from', 'up', 'about', 'into', 'over', 'after', 'this', 'that',
  'it', 'as', 'be', 'so', 'can', 'not', 'you', 'i', 'we', 'they', 'he', 'she', 'my', 'your',
  'our', 'their', 'his', 'her', 'which', 'who', 'what', 'where', 'when', 'how', 'all', 'any',
  'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'only', 'own', 'same',
]);

export function countWordsAndStats(
  text: string,
  options?: { filterStopWords?: boolean }
): WordCountResult {
  if (!text || text.trim().length === 0) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      readingTimeMinutes: 0,
      speakingTimeMinutes: 0,
      topKeywords: [],
    };
  }

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;

  // Words counting using Intl.Segmenter or regex
  let words = 0;
  const wordTokens: string[] = [];

  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    try {
      const segmenter = new Intl.Segmenter('en', { granularity: 'word' });
      for (const segment of segmenter.segment(text)) {
        if (segment.isWordLike) {
          words++;
          wordTokens.push(segment.segment.toLowerCase());
        }
      }
    } catch {
      // Fallback below
    }
  }

  if (words === 0) {
    const matches = text.match(/[\p{L}\p{N}'’\-_]+/gu);
    if (matches) {
      words = matches.length;
      for (const m of matches) {
        wordTokens.push(m.toLowerCase());
      }
    }
  }

  // Sentences
  const sentenceMatches = text.match(/[^.!?]+[.!?]+(\s|$)/g);
  const sentences = sentenceMatches ? sentenceMatches.length : (words > 0 ? 1 : 0);

  // Paragraphs
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0).length;

  // Lines
  const lines = text.split(/\r\n|\r|\n/).length;

  // Reading time (200 wpm) and speaking time (130 wpm)
  const readingTimeMinutes = Math.max(1, Math.round((words / 200) * 10) / 10);
  const speakingTimeMinutes = Math.max(1, Math.round((words / 130) * 10) / 10);

  // Top Keywords
  const frequencyMap: Record<string, number> = {};
  const filterStop = options?.filterStopWords ?? true;

  for (const token of wordTokens) {
    const clean = token.replace(/[^a-z0-9]/gi, '').toLowerCase();
    if (clean.length < 2) continue;
    if (filterStop && COMMON_STOP_WORDS.has(clean)) continue;
    frequencyMap[clean] = (frequencyMap[clean] || 0) + 1;
  }

  const topKeywords: KeywordFrequency[] = Object.entries(frequencyMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({
      word,
      count,
      density: words > 0 ? Math.round((count / words) * 1000) / 10 : 0,
    }));

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs: Math.max(1, paragraphs),
    lines,
    readingTimeMinutes,
    speakingTimeMinutes,
    topKeywords,
  };
}

