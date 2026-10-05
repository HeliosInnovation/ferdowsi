import { removeDiacritics } from './characters/remove-diacritics';
import { removeSpecialChars } from './characters/remove-special-chars';
import { replaceUnicodeLigatures } from './characters/replace-unicode-ligatures';
import { toPersianNumbers } from './characters/to-persian-numbers';
import { unifyCharacters } from './characters/unify-characters';
import { correctSpacing } from './spacing/correct-spacing';
import { applyPersianStyle } from './style/apply-persian-style';
import type { NormalizeOptions } from './types';

/**
 * Normalizes Persian text with the rule-based steps of hazm's `Normalizer().normalize()`, in the
 * same order. Each step can be turned off through `options`.
 *
 * The output matches hazm run without its word dictionary: dictionary-based fixes (joining
 * compound words, shortening repeated letters, separating `می`) are not applied.
 *
 * @example
 * normalize('اِعلام کَرد : « زمین لرزه ای به بُزرگیِ 6 دهم ریشتر ...»');
 * // 'اعلام کرد: «زمین لرزه‌ای به بزرگی ۶ دهم ریشتر …»'
 * normalize('ساعت 18', { persianNumbers: false }); // 'ساعت 18'
 */
export const normalize = (text: string, options: NormalizeOptions = {}): string => {
  let result = unifyCharacters(text);
  if (options.persianStyle !== false) {
    result = applyPersianStyle(result);
  }
  if (options.persianNumbers !== false) {
    result = toPersianNumbers(result);
  }
  if (options.removeDiacritics !== false) {
    result = removeDiacritics(result);
  }
  if (options.correctSpacing !== false) {
    result = correctSpacing(result);
  }
  if (options.unicodeReplacement !== false) {
    result = replaceUnicodeLigatures(result);
  }
  if (options.removeSpecialChars !== false) {
    result = removeSpecialChars(result);
  }
  return result;
};
