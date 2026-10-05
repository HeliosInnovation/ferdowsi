/**
 * hazm's `UNICODE_REPLACEMENTS`. hazm applies them with plain `str.replace`, so the entries that
 * look like regex alternations only ever match that literal text; kept as-is for parity.
 */
export const UNICODE_REPLACEMENTS: readonly (readonly [from: string, to: string])[] = [
  ['﷽', 'بسم الله الرحمن الرحیم'],
  ['﷼', 'ریال'],
  ['(ﷰ|ﷹ)', 'صلی'],
  ['ﷲ', 'الله'],
  ['ﷳ', 'اکبر'],
  ['ﷴ', 'محمد'],
  ['ﷵ', 'صلعم'],
  ['ﷶ', 'رسول'],
  ['ﷷ', 'علیه'],
  ['ﷸ', 'وسلم'],
  ['ﻵ|ﻶ|ﻷ|ﻸ|ﻹ|ﻺ|ﻻ|ﻼ', 'لا'],
];
