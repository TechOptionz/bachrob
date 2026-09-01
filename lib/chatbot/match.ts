/**
 * Client-safe half of the chat assistant: message shapes and the keyword
 * matcher. Deliberately imports nothing, so the browser bundle carries only
 * this file — the knowledge base itself is built server-side in ./index.ts
 * and handed to the widget as serialised props.
 */

export type ChatLink = { href: string; label: string };

export type ChatEntry = {
  id: string;
  /** Multi-word triggers, matched as whole-word substrings. Worth 3 points. */
  phrases: string[];
  /** Single-word triggers, matched against the visitor's tokens. Worth 1 point. */
  keywords: string[];
  answer: string;
  links?: ChatLink[];
  /** Quick replies offered under the answer; each is re-asked as a question. */
  chips?: string[];
  /**
   * Tie-break between equally scored entries — higher wins. Specific FAQ
   * answers outrank the general service blurbs, which outrank small talk, so
   * "hi, when is my tax return due" gets the due-date answer, not "Hello!".
   */
  priority: number;
};

export type ChatMessageSeed = {
  text: string;
  links?: ChatLink[];
  chips?: string[];
};

export type ChatConfig = {
  entries: ChatEntry[];
  greeting: ChatMessageSeed;
  fallback: ChatMessageSeed;
};

/** Lower-case, strip apostrophes, and reduce everything else to word gaps. */
export const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Score every entry against the visitor's question and return the winner, or
 * null when nothing scores well enough — the widget then answers with the
 * fallback (phone, email, quick replies).
 *
 * A phrase hit is worth three keyword hits, so "tax return" beats a stray
 * "return" elsewhere. Single-keyword matches only count for one- or two-word
 * questions ("bookkeeping?", "opening hours") where one word is the question.
 */
export function matchEntry(
  input: string,
  entries: ChatEntry[],
): ChatEntry | null {
  const norm = normalize(input);
  if (!norm) return null;
  const padded = ` ${norm} `;
  const tokens = norm.split(" ");
  const tokenSet = new Set(tokens);

  let best: ChatEntry | null = null;
  let bestScore = 0;
  for (const entry of entries) {
    let score = 0;
    for (const p of entry.phrases) if (padded.includes(` ${p} `)) score += 3;
    for (const k of entry.keywords) if (tokenSet.has(k)) score += 1;
    if (
      score > bestScore ||
      (score === bestScore && score > 0 && best && entry.priority > best.priority)
    ) {
      best = entry;
      bestScore = score;
    }
  }

  if (bestScore >= 2) return best;
  if (bestScore === 1 && tokens.length <= 2) return best;
  return null;
}
