import { applyRegexReplacements } from '../../../helpers/apply-regex-replacements';
import { tokenizeWords } from '../../tokenization/tokenize-words';
import {
  AFFIX_SPACING_PATTERNS,
  EXTRA_SPACE_PATTERNS,
  PUNCTUATION_SPACING_PATTERNS,
} from './spacing-patterns';

// Lines Python's `str.strip()` would reduce to nothing.
// biome-ignore lint/suspicious/noControlCharactersInRegex: Python counts \x1c-\x1f as whitespace.
const BLANK_LINE = /^[\t-\r\x1c-\x20\x85\xa0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000]*$/u;

/**
 * Fixes spacing: collapses extra spaces, newlines and ZWNJs, removes keshide, joins affixes with a
 * ZWNJ, and puts spaces on the correct side of punctuation and numbers.
 * hazm: `Normalizer.correct_spacing`, without its dictionary-based joining of compound words.
 *
 * @example
 * correctSpacing('سلام   دنیا'); // 'سلام دنیا'
 * correctSpacing('به طول ۹متر و عرض۶'); // 'به طول ۹ متر و عرض ۶'
 * correctSpacing('جمعهها که کار نمی کنم'); // 'جمعه‌ها که کار نمی‌کنم'
 */
export const correctSpacing = (text: string): string => {
  const lines = applyRegexReplacements(text, EXTRA_SPACE_PATTERNS)
    .split('\n')
    .map((line) => {
      // hazm re-joins each line's tokens, which normalizes spacing around punctuation.
      return BLANK_LINE.test(line) ? line : tokenizeWords(line).join(' ');
    });
  const affixed = applyRegexReplacements(lines.join('\n'), AFFIX_SPACING_PATTERNS);
  return applyRegexReplacements(affixed, PUNCTUATION_SPACING_PATTERNS);
};
