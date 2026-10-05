import { createCharacterTranslator } from '../../../helpers/create-character-translator';
import { TRANSLATION_FROM, TRANSLATION_TO } from '../constants/character-maps';

const translate = /* @__PURE__ */ createCharacterTranslator(TRANSLATION_FROM, TRANSLATION_TO);

/**
 * Replaces Arabic, Urdu and presentation-form letters with standard Persian ones, curly quotes
 * with `"` and the no-break space with a space. Always the first step of `normalize`.
 *
 * @example
 * unifyCharacters('كتاب علي'); // 'کتاب علی'
 */
export const unifyCharacters = (text: string): string => {
  return translate(text);
};
