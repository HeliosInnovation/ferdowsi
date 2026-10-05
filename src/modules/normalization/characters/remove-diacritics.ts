const DIACRITICS = /[\u064b-\u0652]/gu;

/**
 * Removes Arabic diacritics: tanwin, fatha, damma, kasra, shadda and sukun.
 * hazm: `Normalizer.remove_diacritics`.
 *
 * @example
 * removeDiacritics('حَذفِ اِعراب'); // 'حذف اعراب'
 */
export const removeDiacritics = (text: string): string => {
  return text.replace(DIACRITICS, '');
};
