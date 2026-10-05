import { describe, expect, it } from 'vitest';
import { applyRegexReplacements } from './apply-regex-replacements';
import { createCharacterTranslator } from './create-character-translator';

describe('applyRegexReplacements', () => {
  // Scenario from hazm's `regex_replace` docstring.
  it('applies the replacements in order', () => {
    const replacements = [
      [/apples/g, 'oranges'],
      [/red/g, 'blue'],
    ] as const;
    expect(applyRegexReplacements('red apples', replacements)).toBe('blue oranges');
  });
});

describe('createCharacterTranslator', () => {
  // Scenarios from hazm's `maketrans` docstring and Python's `str.translate`.
  it.each([
    ['012', '۰۱۲', '012', '۰۱۲'],
    ['aa', 'xy', 'a', 'y'],
    ['abc', 'x', 'abc', 'xbc'],
    ['a', 'xyz', 'abc', 'xbc'],
    ['😂', 'x', 'a😂', 'ax'],
    ['-]^\\', 'abcd', 'x-]^\\', 'xabcd'],
  ])('maps %j to %j in %j', (from, to, text, expected) => {
    expect(createCharacterTranslator(from, to)(text)).toBe(expected);
  });
});
