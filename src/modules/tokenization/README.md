# tokenization

Splits Persian text into words and punctuation. A port of [hazm](https://github.com/roshan-research/hazm)'s `WordTokenizer(join_verb_parts=False).tokenize`, the tokenizer hazm's `Normalizer` uses.

Unlike hazm's default `word_tokenize`, multi-part verbs are not joined, because that needs hazm's verb list:

| Input            | hazm `word_tokenize` | `tokenizeWords`          |
| ---------------- | -------------------- | ------------------------ |
| `'گفته شده است'` | `['گفته_شده_است']`   | `['گفته', 'شده', 'است']` |
| `'خواهد رفت'`    | `['خواهد_رفت']`      | `['خواهد', 'رفت']`       |

## Import

```ts
import { tokenizeWords } from 'persian-kit/tokenization';
```

## Usage

```ts
tokenizeWords('این جمله (خیلی) پیچیده نیست!!!');
// → ['این', 'جمله', '(', 'خیلی', ')', 'پیچیده', 'نیست', '!!!']

tokenizeWords('زلزله ۴.۸ ریشتری');
// → ['زلزله', '۴.۸', 'ریشتری']
```

## `tokenizeWords(text)`

| Parameter | Type     | Description       |
| --------- | -------- | ----------------- |
| `text`    | `string` | Text to tokenize. |

Splits on spaces, tabs and newlines. Punctuation becomes its own token: `. : ، ؛ ؟ ! ? » « [ ] ( ) { } " / \`. Runs of `؟!?` stay together, and so do numbers with `.` or `:` (`۴.۸`, `12:30`).

## Output schema

**Returns** `string[]`: tokens in reading order, never empty strings. Blank input returns `[]`.
