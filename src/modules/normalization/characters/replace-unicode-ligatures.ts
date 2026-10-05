import { UNICODE_REPLACEMENTS } from '../constants/unicode-replacements';

/**
 * Expands Arabic ligatures into their words, e.g. `﷽` and `﷼`.
 * hazm: `Normalizer.unicodes_replacement`.
 *
 * @example
 * replaceUnicodeLigatures('۱۰۰ ﷼'); // '۱۰۰ ریال'
 */
export const replaceUnicodeLigatures = (text: string): string => {
  return UNICODE_REPLACEMENTS.reduce((result, [from, to]) => {
    return result.replaceAll(from, to);
  }, text);
};
