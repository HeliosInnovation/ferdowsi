import { createCharacterTranslator } from '../../../helpers/create-character-translator';
import { NUMBERS_FROM, NUMBERS_TO } from '../constants/character-maps';

const translate = /* @__PURE__ */ createCharacterTranslator(NUMBERS_FROM, NUMBERS_TO);

/**
 * Replaces Latin and Arabic-Indic digits with Persian digits, and `%` with `٪`.
 * hazm: `Normalizer.persian_number`.
 *
 * @example
 * toPersianNumbers('5 درصد'); // '۵ درصد'
 */
export const toPersianNumbers = (text: string): string => {
  return translate(text);
};
