import { applyRegexReplacements } from '../../../helpers/apply-regex-replacements';
import type { RegexReplacement } from '../../../types/regex-replacement';

// `\p{Nd}` stands in for Python's Unicode-aware `\d`, which also matches Persian digits.
const PERSIAN_STYLE: readonly RegexReplacement[] = [
  [/"([^\n"]+)"/gu, '«$1»'],
  [/([\p{Nd}+])\.([\p{Nd}+])/gu, '$1٫$2'],
  [/ ?\.\.\./gu, ' …'],
];

/**
 * Uses Persian guillemets for double quotes, `٫` as the decimal separator and `…` for `...`.
 * hazm: `Normalizer.persian_style`.
 *
 * @example
 * applyPersianStyle('"نرمال‌سازی"'); // '«نرمال‌سازی»'
 * applyPersianStyle('10.450'); // '10٫450'
 */
export const applyPersianStyle = (text: string): string => {
  return applyRegexReplacements(text, PERSIAN_STYLE);
};
