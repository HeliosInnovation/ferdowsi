const TOKEN_SEPARATORS = /([؟!?]+|[\p{Nd}.:]+|[:.،؛»\])}"«[({/\\])/gu;

/**
 * Splits text into words and punctuation, as hazm's `WordTokenizer(join_verb_parts=False)` does
 * with its default options. Unlike hazm's `word_tokenize`, multi-part verbs such as
 * `گفته شده است` are not joined.
 *
 * @example
 * tokenizeWords('این جمله (خیلی) پیچیده نیست!!!');
 * // ['این', 'جمله', '(', 'خیلی', ')', 'پیچیده', 'نیست', '!!!']
 */
export const tokenizeWords = (text: string): string[] => {
  return text
    .replaceAll('\n', ' ')
    .replaceAll('\t', ' ')
    .replace(TOKEN_SEPARATORS, ' $1 ')
    .split(' ')
    .filter((token) => {
      return token.length > 0;
    });
};
