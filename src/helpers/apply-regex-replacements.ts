import type { RegexReplacement } from '../types/regex-replacement';

/** Applies each replacement to the text in order. */
export const applyRegexReplacements = (
  text: string,
  replacements: readonly RegexReplacement[],
): string => {
  return replacements.reduce((result, [pattern, replacement]) => {
    return result.replace(pattern, replacement);
  }, text);
};
