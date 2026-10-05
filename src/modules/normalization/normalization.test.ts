// Scenarios from hazm's tests/test_normalizer.py and the `Normalizer` docstrings that don't need
// hazm's word dictionary.
import { describe, expect, it } from 'vitest';
import { removeDiacritics } from './characters/remove-diacritics';
import { removeSpecialChars } from './characters/remove-special-chars';
import { replaceUnicodeLigatures } from './characters/replace-unicode-ligatures';
import { toPersianNumbers } from './characters/to-persian-numbers';
import { unifyCharacters } from './characters/unify-characters';
import { normalize } from './normalize';
import { correctSpacing } from './spacing/correct-spacing';
import { applyPersianStyle } from './style/apply-persian-style';
import type { NormalizeOptions } from './types';

describe('normalize', () => {
  it.each([
    [
      'اِعلاممممم کَرد : « زمین لرزه ای به بُزرگیِ 6 دهم ریشتر ...»',
      'اعلاممممم کرد: «زمین لرزه\u200cای به بزرگی ۶ دهم ریشتر …»',
    ],
    ['دیگه میخوام ترک تحصیل کنم 😂😂😂', 'دیگه میخوام ترک تحصیل کنم 😂😂😂'],
    ['  ', ''],
    ['', ''],
  ])('normalizes %j', (text, expected) => {
    expect(normalize(text)).toBe(expected);
  });

  it.each<[NormalizeOptions, string, string]>([
    [{ correctSpacing: false }, 'سلام    دنیا', 'سلام    دنیا'],
    [{ removeDiacritics: false }, 'حَذفِ اِعراب', 'حَذفِ اِعراب'],
    [{ removeSpecialChars: false }, 'پیامبر اکرم ﷺ', 'پیامبر اکرم ﷺ'],
    [{ persianStyle: false }, '"نقل\u200cقول"', '"نقل\u200cقول"'],
    [{ persianNumbers: false }, 'ساعت 18', 'ساعت 18'],
    [{ unicodeReplacement: false }, '﷽', '﷽'],
  ])('skips the step turned off with %j', (options, text, expected) => {
    expect(normalize(text, options)).toBe(expected);
  });

  it('still unifies characters with every step off', () => {
    const allOff: NormalizeOptions = {
      correctSpacing: false,
      removeDiacritics: false,
      removeSpecialChars: false,
      persianStyle: false,
      persianNumbers: false,
      unicodeReplacement: false,
    };
    expect(normalize('كتاب  علي 5', allOff)).toBe('کتاب  علی 5');
  });
});

describe('unifyCharacters', () => {
  it.each([
    ['كتاب علي', 'کتاب علی'],
    ['ﺍﺏ', 'اب'],
    ['“سلام”\u00a0دنیا', '"سلام" دنیا'],
    ['سلام دنیا ۱۲۳', 'سلام دنیا ۱۲۳'],
  ])('unifies %j', (text, expected) => {
    expect(unifyCharacters(text)).toBe(expected);
  });
});

describe('correctSpacing', () => {
  it.each([
    ['سلام    دنیا', 'سلام دنیا'],
    ['     سلام', 'سلام'],
    ['سلام     ', 'سلام'],
    ['مسافت ۹کیلومتر', 'مسافت ۹ کیلومتر'],
    ['مسافت۹ کیلومتر', 'مسافت ۹ کیلومتر'],
    // Replaces more than one ZWNJ with one ZWNJ.
    ['کاروان\u200c\u200cسرا', 'کاروان\u200cسرا'],
    // Removes ZWNJs after spaces.
    ['سلام \u200c\u200cدنیا', 'سلام دنیا'],
    // Removes ZWNJs before spaces.
    ['سلام\u200c\u200c دنیا', 'سلام دنیا'],
    // Removes ZWNJs at the beginning of the string.
    ['\u200c\u200cکاروان\u200cسرا', 'کاروان\u200cسرا'],
    // Removes ZWNJs at the end of the string.
    ['کاروان\u200cسرا\u200c\u200c', 'کاروان\u200cسرا'],
    ['ســلام', 'سلام'],
    ['جمعهها مطالعه کنید', 'جمعه\u200cها مطالعه کنید'],
    ['   (سلام)', '(سلام)'],
    ['(سلام)   ', '(سلام)'],
    ['  (سلام)   ', '(سلام)'],
    ['به طول ۹متر و عرض۶', 'به طول ۹ متر و عرض ۶'],
    ['جمعهها که کار نمی کنم مطالعه می کنم', 'جمعه\u200cها که کار نمی\u200cکنم مطالعه می\u200cکنم'],
    [' "سلام به همه"   ', '"سلام به همه"'],
    ['خط اول\n\n\n\nخط دوم  \n', 'خط اول\n\nخط دوم\n'],
    ['   ', ''],
    ['', ''],
  ])('corrects spacing of %j', (text, expected) => {
    expect(correctSpacing(text)).toBe(expected);
  });
});

describe('removeDiacritics', () => {
  it.each([
    ['ح\u064eذف\u0650 ا\u0650عراب', 'حذف اعراب'],
    ['آمدند', 'آمدند'],
    ['متن بدون اعراب', 'متن بدون اعراب'],
    ['  ', '  '],
    ['', ''],
  ])('removes diacritics from %j', (text, expected) => {
    expect(removeDiacritics(text)).toBe(expected);
  });
});

describe('removeSpecialChars', () => {
  it.each([
    ['پیامبر اکرم ﷺ', 'پیامبر اکرم '],
    ['سلام', 'سلام'],
    ['', ''],
  ])('removes special characters from %j', (text, expected) => {
    expect(removeSpecialChars(text)).toBe(expected);
  });
});

describe('applyPersianStyle', () => {
  it.each([
    ['"نقل\u200cقول"', '«نقل\u200cقول»'],
    ['"نرمال\u200cسازی"', '«نرمال\u200cسازی»'],
    ['و...', 'و …'],
    ['و ...', 'و …'],
    ['10.450', '10٫450'],
    ['سلام', 'سلام'],
    ['  ', '  '],
    ['', ''],
  ])('applies Persian style to %j', (text, expected) => {
    expect(applyPersianStyle(text)).toBe(expected);
  });
});

describe('toPersianNumbers', () => {
  it.each([
    ['ساعت 18', 'ساعت ۱۸'],
    ['ساعت ۱۸', 'ساعت ۱۸'],
    ['5 درصد', '۵ درصد'],
    ['  ', '  '],
    ['', ''],
  ])('converts numbers in %j', (text, expected) => {
    expect(toPersianNumbers(text)).toBe(expected);
  });
});

describe('replaceUnicodeLigatures', () => {
  it.each([
    ['﷽', 'بسم الله الرحمن الرحیم'],
    ['۱۰۰ ﷼', '۱۰۰ ریال'],
    // hazm uses plain `str.replace`, so this entry only matches its literal text.
    ['(ﷰ|ﷹ)', 'صلی'],
    ['  ', '  '],
    ['', ''],
  ])('replaces ligatures in %j', (text, expected) => {
    expect(replaceUnicodeLigatures(text)).toBe(expected);
  });
});
