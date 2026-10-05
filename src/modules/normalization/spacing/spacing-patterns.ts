import type { RegexReplacement } from '../../../types/regex-replacement';

// hazm's patterns are Python regexes, translated here to behave identically in JS:
// - `\d` is Unicode-aware in Python, so it becomes `\p{Nd}` (it must match `۰-۹` too).
// - `\b` / `\B` are Unicode-aware in Python, so they become lookarounds on `[\p{L}\p{N}_]`,
//   Python's word characters.
// - Python's `$` also matches before a final newline, so `$` becomes `(?=\n?$)` where it matters.

/** hazm's `EXTRA_SPACE_PATTERNS`. */
export const EXTRA_SPACE_PATTERNS: readonly RegexReplacement[] = [
  [/^ +| +(?=\n?$)/gu, ''],
  [/ {2,}/gu, ' '],
  [/\n{3,}/gu, '\n\n'],
  [/\u200c{2,}/gu, '\u200c'],
  [/\u200c+ /gu, ' '],
  [/ \u200c+/gu, ' '],
  // ZWNJs at the end of a word: hazm's `\b\u200c*\B`. Only non-empty matches change the text, and
  // around a ZWNJ run (non-word characters) that boundary pair reduces to these lookarounds.
  [/(?<=[\p{L}\p{N}_])\u200c+(?![\p{L}\p{N}_])/gu, ''],
  // ZWNJs at the start of a word: hazm's `\B\u200c*\b`, reduced the same way.
  [/(?<![\p{L}\p{N}_])\u200c+(?=[\p{L}\p{N}_])/gu, ''],
  // Keshide (tatweel) and carriage returns.
  [/[ـ\r]/gu, ''],
];

/** hazm's `AFFIX_SPACING_PATTERNS`: joins prefixes and suffixes with a ZWNJ. */
export const AFFIX_SPACING_PATTERNS: readonly RegexReplacement[] = [
  [/([^ ]ه) ی /gu, '$1\u200cی '],
  [/(^| )(ن?می) /gu, '$1$2\u200c'],
  [
    /(?<=[^\n\p{Nd} .:!،؛؟»\])}«[({]{2}) (تر(ین?)?|گری?|های?)(?=[ \n.:!،؛؟»\])}«[({]|$)/gu,
    '\u200c$1',
  ],
  [/([^ ]ه) (ا(م|یم|ش|ند|ی|ید|ت))(?=[ \n.:!،؛؟»\])}]|$)/gu, '$1\u200c$2'],
  [/(ه)(ها)/gu, '$1\u200c$2'],
];

/** hazm's `PUNCTUATION_SPACING_PATTERNS`. */
export const PUNCTUATION_SPACING_PATTERNS: readonly RegexReplacement[] = [
  [/" ([^\n"]+) "/gu, '"$1"'],
  [/ ([.:!،؛؟»\])}])/gu, '$1'],
  [/([«[({]) /gu, '$1'],
  [/([.:])([^ .:!،؛؟»\])}\p{Nd}۰۱۲۳۴۵۶۷۸۹])/gu, '$1 $2'],
  [/([!،؛؟»\])}])([^ .:!،؛؟»\])}])/gu, '$1 $2'],
  [/([^ «[({])([«[({])/gu, '$1 $2'],
  [/(\p{Nd})([آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی])/gu, '$1 $2'],
  [/([آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی])(\p{Nd})/gu, '$1 $2'],
];
