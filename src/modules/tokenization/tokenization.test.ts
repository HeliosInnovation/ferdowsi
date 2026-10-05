// Scenarios from hazm's tests/test_word_tokenizer.py, with `join_verb_parts=False`.
import { describe, expect, it } from 'vitest';
import { tokenizeWords } from './tokenize-words';

describe('tokenizeWords', () => {
  it.each([
    ['این جمله (خیلی) پیچیده نیست!!!', ['این', 'جمله', '(', 'خیلی', ')', 'پیچیده', 'نیست', '!!!']],
    ['سلام.', ['سلام', '.']],
    ['زلزله ۴.۸ ریشتری در هجدک کرمان', ['زلزله', '۴.۸', 'ریشتری', 'در', 'هجدک', 'کرمان']],
    ['دیگه میخوام ترک تحصیل کنم 😂😂😂', ['دیگه', 'میخوام', 'ترک', 'تحصیل', 'کنم', '😂😂😂']],
    ['سلام\nدنیا\tخوب', ['سلام', 'دنیا', 'خوب']],
    // hazm's `join_verb_parts=False`: multi-part verbs stay separate tokens.
    ['گفته شده است', ['گفته', 'شده', 'است']],
    ['   ', []],
    ['', []],
  ])('tokenizes %j', (text, expected) => {
    expect(tokenizeWords(text)).toEqual(expected);
  });
});
