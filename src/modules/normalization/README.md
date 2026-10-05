# normalization

Normalizes Persian text: unifies Arabic letters, fixes spacing and ZWNJs (نیم‌فاصله), removes diacritics, converts digits and more. A TypeScript port of the rule-based steps of [hazm](https://github.com/roshan-research/hazm)'s `Normalizer`, with identical output to hazm run without its word dictionary.

## Import

```ts
import { normalize } from 'persian-kit/normalization';
```

## Usage

```ts
normalize('اِعلام کَرد : « زمین لرزه ای به بُزرگیِ 6 دهم ریشتر ...»');
// → 'اعلام کرد: «زمین لرزه‌ای به بزرگی ۶ دهم ریشتر …»'

// Turn steps off:
normalize('ساعت 18', { persianNumbers: false });
// → 'ساعت 18'
```

## `normalize(text, options?)`

Runs the steps below in hazm's order. `unifyCharacters` always runs first; every other step is on unless set to `false`.

| Option               | Type      | Default | Step                                                                  |
| -------------------- | --------- | ------- | --------------------------------------------------------------------- |
| `persianStyle`       | `boolean` | `true`  | `"…"` → `«…»`, `10.5` → `10٫5`, `...` → `…`                           |
| `persianNumbers`     | `boolean` | `true`  | `0-9`, `٠-٩` → `۰-۹` and `%` → `٪`                                    |
| `removeDiacritics`   | `boolean` | `true`  | Removes fatha, kasra, damma, tanwin, shadda, sukun                    |
| `correctSpacing`     | `boolean` | `true`  | Fixes spaces and ZWNJs around words, affixes, punctuation and numbers |
| `unicodeReplacement` | `boolean` | `true`  | Expands ligatures: `﷽` → `بسم الله الرحمن الرحیم`, `﷼` → `ریال`       |
| `removeSpecialChars` | `boolean` | `true`  | Removes Quranic marks and honorifics such as `ﷺ`                      |

**Returns** `string`: the normalized text.

Emoji, Latin text and characters no step handles are kept as they are. hazm's dictionary-based fixes (joining compound words such as `زمین لرزه`, shortening repeated letters, separating `می` in verbs) are not part of this module.

## Steps as functions

Each step is also exported on its own (tree-shakeable). All take a `string` and return a `string`.

| Function                        | hazm method             | Example                                                |
| ------------------------------- | ----------------------- | ------------------------------------------------------ |
| `unifyCharacters(text)`         | translation table       | `'كتاب علي'` → `'کتاب علی'`                            |
| `applyPersianStyle(text)`       | `persian_style`         | `'"سلام"'` → `'«سلام»'`                                |
| `toPersianNumbers(text)`        | `persian_number`        | `'5 درصد'` → `'۵ درصد'`                                |
| `removeDiacritics(text)`        | `remove_diacritics`     | `'حَذفِ اِعراب'` → `'حذف اعراب'`                       |
| `correctSpacing(text)`          | `correct_spacing`       | `'جمعهها که کار نمی کنم'` → `'جمعه‌ها که کار نمی‌کنم'` |
| `replaceUnicodeLigatures(text)` | `unicodes_replacement`  | `'۱۰۰ ﷼'` → `'۱۰۰ ریال'`                               |
| `removeSpecialChars(text)`      | `remove_specials_chars` | `'پیامبر ﷺ'` → `'پیامبر '`                             |
