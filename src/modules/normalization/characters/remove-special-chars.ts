const SPECIAL_CHARS =
  /[\u0605\u0610-\u0616\u0618-\u061a\u061e\u0653-\u065f\u0670\u06d4\u06d6-\u06ed\u06fd\u06fe\u08ad\u08d4-\u08ff\ufbb2-\ufbc1\ufc5e-\ufc63\ufcf2-\ufcf4\ufd3e\ufd3f\ufdfa\ufdfb\ufe70-\ufe72\ufe76-\ufe7f]/gu;

/**
 * Removes Quranic annotation marks, honorific ligatures and other characters that carry no
 * meaning for text processing. hazm: `Normalizer.remove_specials_chars`.
 *
 * @example
 * removeSpecialChars('پیامبر اکرم ﷺ'); // 'پیامبر اکرم '
 */
export const removeSpecialChars = (text: string): string => {
  return text.replace(SPECIAL_CHARS, '');
};
