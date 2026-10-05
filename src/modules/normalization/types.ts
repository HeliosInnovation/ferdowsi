/** Toggles for each step of `normalize`. Every step is on unless set to `false`. */
export interface NormalizeOptions {
  /** Fix spaces and ZWNJs around words, affixes and punctuation. @default true */
  readonly correctSpacing?: boolean;
  /** Remove Arabic diacritics (اِعراب) such as fatha, kasra and tanwin. @default true */
  readonly removeDiacritics?: boolean;
  /** Remove Quranic marks and other special characters. @default true */
  readonly removeSpecialChars?: boolean;
  /** Use Persian quotes `«»`, decimal separator `٫` and ellipsis `…`. @default true */
  readonly persianStyle?: boolean;
  /** Replace Latin and Arabic-Indic digits and `%` with Persian ones. @default true */
  readonly persianNumbers?: boolean;
  /** Expand ligatures such as `﷽` and `﷼` into words. @default true */
  readonly unicodeReplacement?: boolean;
}
