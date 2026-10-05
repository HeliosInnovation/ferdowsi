const ENGLISH_ZERO = 0x30;
const ARABIC_ZERO = 0x0660;
const PERSIAN_ZERO = 0x06f0;

const NON_PERSIAN_DIGIT = /[0-9٠-٩]/g;
const NON_ENGLISH_DIGIT = /[٠-٩۰-۹]/g;

/** Numeric value (0-9) of a single English, Arabic-Indic or Persian digit character. */
function digitValue(digit: string): number {
  const code = digit.charCodeAt(0);
  if (code >= PERSIAN_ZERO) {
    return code - PERSIAN_ZERO;
  }
  if (code >= ARABIC_ZERO) {
    return code - ARABIC_ZERO;
  }
  return code - ENGLISH_ZERO;
}

/**
 * Replaces English (0-9) and Arabic-Indic (٠-٩) digits with Persian digits (۰-۹).
 *
 * Numbers are stringified with `String()`, so very large or small numbers keep their
 * exponent notation (`1e21` → `'۱e+۲۱'`). Format them first if that matters.
 *
 * @example
 * toPersianDigits('1403/01/15'); // '۱۴۰۳/۰۱/۱۵'
 * toPersianDigits('٤٢'); // '۴۲'
 * toPersianDigits(42); // '۴۲'
 */
export function toPersianDigits(input: string | number): string {
  return String(input).replace(NON_PERSIAN_DIGIT, (digit) =>
    String.fromCharCode(PERSIAN_ZERO + digitValue(digit)),
  );
}

/**
 * Replaces Persian (۰-۹) and Arabic-Indic (٠-٩) digits with English digits (0-9).
 *
 * @example
 * toEnglishDigits('۱۴۰۳/۰۱/۱۵'); // '1403/01/15'
 * toEnglishDigits('٤٢'); // '42'
 */
export function toEnglishDigits(input: string): string {
  return input.replace(NON_ENGLISH_DIGIT, (digit) => String(digitValue(digit)));
}
