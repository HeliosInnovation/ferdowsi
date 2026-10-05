const CHARACTER_CLASS_SYNTAX = /[\\\]^-]/g;

/**
 * Builds a function that swaps single characters, like Python's
 * `str.translate(str.maketrans(from, to))`: the n-th character of `from` becomes the n-th
 * character of `to`. As with Python's `zip`, characters past the shorter string are left
 * unchanged, and a character listed twice in `from` keeps its last mapping.
 *
 * @example
 * const toUpperAbc = createCharacterTranslator('abc', 'ABC');
 * toUpperAbc('a cab'); // 'A CAB'
 */
export const createCharacterTranslator = (from: string, to: string): ((text: string) => string) => {
  const sources = Array.from(from);
  const targets = Array.from(to);
  const table = new Map<string, string>();
  for (const [index, source] of sources.entries()) {
    const target = targets[index];
    if (target !== undefined) {
      table.set(source, target);
    }
  }
  const pattern = new RegExp(`[${from.replace(CHARACTER_CLASS_SYNTAX, '\\$&')}]`, 'gu');
  return (text) => {
    return text.replace(pattern, (char) => {
      return table.get(char) ?? char;
    });
  };
};
