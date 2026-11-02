/**
 * Pure framework-free, secure client-side Markdown to HTML renderer
 */

export function parseMarkdown(markdown: string): string {
  if (!markdown) return '';

  let html = markdown
    // Escape standard HTML chars first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Fenced code blocks ```lang ... ```
  html = html.replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre class="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono leading-relaxed"><code>${code.trim()}</code></pre>`;
  });

  // Inline code `code`
  html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');

  // Headings # -> h1, ## -> h2, ### -> h3, etc.
  html = html.replace(/^###### (.*$)/gim, '<h6 class="text-base font-semibold text-slate-800 dark:text-slate-100 mt-4 mb-2">$1</h6>');
  html = html.replace(/^##### (.*$)/gim, '<h5 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mt-4 mb-2">$1</h5>');
  html = html.replace(/^#### (.*$)/gim, '<h4 class="text-xl font-semibold text-slate-800 dark:text-slate-100 mt-5 mb-2">$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-6 mb-3">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-8 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-4xl font-extrabold text-slate-900 dark:text-slate-50 mt-8 mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">$1</h1>');

  // Horizontal rules
  html = html.replace(/^(?:---|\*\*\*|___)\s*$/gim, '<hr class="my-6 border-slate-200 dark:border-slate-800" />');

  // Blockquotes > quote
  html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-primary-500 pl-4 py-1 my-3 text-slate-600 dark:text-slate-300 italic bg-primary-50/30 dark:bg-primary-950/20 rounded-r">$1</blockquote>');

  // Bold & Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-slate-100">$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong class="font-bold text-slate-900 dark:text-slate-100">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');

  // Strikethrough ~~text~~
  html = html.replace(/~~(.*?)~~/g, '<del class="line-through text-slate-500">$1</del>');

  // Links [text](url) - strictly sanitize scheme to http/https/mailto
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">$1</a>');

  // Unordered list items - item or * item
  html = html.replace(/^\s*[-*]\s+(.*$)/gim, '<li class="ml-4 list-disc text-slate-700 dark:text-slate-300 mb-1">$1</li>');

  // Ordered list items 1. item
  html = html.replace(/^\s*(\d+)\.\s+(.*$)/gim, '<li class="ml-4 list-decimal text-slate-700 dark:text-slate-300 mb-1">$2</li>');

  // Paragraphs
  const paragraphs = html.split(/\n{2,}/);
  html = paragraphs
    .map((para) => {
      para = para.trim();
      if (!para) return '';
      // Don't wrap tags that are already blocks
      if (
        para.startsWith('<h') ||
        para.startsWith('<pre') ||
        para.startsWith('<blockquote') ||
        para.startsWith('<hr') ||
        para.startsWith('<li')
      ) {
        return para;
      }
      return `<p class="my-3 text-slate-700 dark:text-slate-300 leading-relaxed">${para.replace(/\n/g, '<br />')}</p>`;
    })
    .join('\n');

  return html;
}

