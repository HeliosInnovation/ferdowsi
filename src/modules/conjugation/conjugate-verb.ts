import { ZWNJ } from '../../constants/characters';
import type { VerbForms } from './types';

// Port of hazm's `Conjugation` class. Each helper mirrors the hazm method of the same name, so
// the generated forms (including hazm's quirks) match exactly. `past` / `present` are the stems.

const MI = `می${ZWNJ}`;
const PAST_ENDINGS = ['م', 'ی', '', 'یم', 'ید', 'ند'];
const PRESENT_ENDINGS = ['م', 'ی', 'د', 'یم', 'ید', 'ند'];
const PERFECT_ENDINGS = [
  `ه${ZWNJ}ام`,
  `ه${ZWNJ}ای`,
  'ه است',
  'ه',
  `ه${ZWNJ}ایم`,
  `ه${ZWNJ}اید`,
  `ه${ZWNJ}اند`,
];

const prefix = (value: string, forms: VerbForms): VerbForms => {
  return forms.map((form) => {
    return value + form;
  });
};
/** `<past>ه <form>`: the past participle followed by an auxiliary. */
const participle = (past: string, forms: VerbForms): VerbForms => {
  return forms.map((form) => {
    return `${past}ه ${form}`;
  });
};
/** Pairs two equally long conjugations word by word, e.g. `داشتم` + `می‌رفتم`. */
const pair = (first: VerbForms, second: VerbForms): VerbForms => {
  return first.slice(0, second.length).map((form, index) => {
    return `${form} ${second[index]}`;
  });
};
/** hazm's imperative fix-up: the 2nd person singular `x` loses its final `ی`. */
const imperative = (forms: VerbForms, from: string, to: string): VerbForms => {
  return forms.map((form) => {
    return form === from ? to : form;
  });
};

const perfectivePast = (past: string): VerbForms => {
  return PAST_ENDINGS.map((ending) => {
    return past + ending;
  });
};
const negativePerfectivePast = (past: string): VerbForms => {
  return prefix('ن', perfectivePast(past));
};
const imperfectivePast = (past: string): VerbForms => {
  return prefix(MI, perfectivePast(past));
};
const negativeImperfectivePast = (past: string): VerbForms => {
  return prefix('ن', imperfectivePast(past));
};

const presentPerfect = (past: string): VerbForms => {
  return PERFECT_ENDINGS.map((ending) => {
    return past + ending;
  });
};
const negativePresentPerfect = (past: string): VerbForms => {
  return prefix('ن', presentPerfect(past));
};
const imperfectivePresentPerfect = (past: string): VerbForms => {
  return prefix(MI, presentPerfect(past));
};
const negativeImperfectivePresentPerfect = (past: string): VerbForms => {
  return prefix('ن', imperfectivePresentPerfect(past));
};

const perfectivePresent = (present: string): VerbForms => {
  return PRESENT_ENDINGS.map((ending) => {
    return present + ending;
  });
};
const negativePerfectivePresent = (present: string): VerbForms => {
  return prefix('ن', perfectivePresent(present));
};
const subjunctivePerfectivePresent = (present: string): VerbForms => {
  return prefix('ب', perfectivePresent(present));
};
const grammaticalPerfectivePresent = (present: string): VerbForms => {
  return imperative(subjunctivePerfectivePresent(present), 'ببینی', 'ببین');
};
const negativeGrammaticalPerfectivePresent = (present: string): VerbForms => {
  return prefix('ن', imperative(perfectivePresent(present), 'بینی', 'بین'));
};
const imperfectivePresent = (present: string): VerbForms => {
  return prefix(MI, perfectivePresent(present));
};
const negativeImperfectivePresent = (present: string): VerbForms => {
  return prefix('ن', imperfectivePresent(present));
};

const subjunctivePresentPerfect = (past: string): VerbForms => {
  return participle(past, perfectivePresent('باش'));
};
const negativeSubjunctivePresentPerfect = (past: string): VerbForms => {
  return prefix('ن', subjunctivePresentPerfect(past));
};
const grammaticalPresentPerfect = (past: string): VerbForms => {
  return participle(past, imperative(perfectivePresent('باش'), 'باشی', 'باش'));
};
const subjunctiveImperfectivePresentPerfect = (past: string): VerbForms => {
  return prefix(MI, subjunctivePresentPerfect(past));
};
const negativeSubjunctiveImperfectivePresentPerfect = (past: string): VerbForms => {
  return prefix('ن', subjunctiveImperfectivePresentPerfect(past));
};

const pastPrecedent = (past: string): VerbForms => {
  return participle(past, perfectivePast('بود'));
};
const negativePastPrecedent = (past: string): VerbForms => {
  return prefix('ن', pastPrecedent(past));
};
const imperfectivePastPrecedent = (past: string): VerbForms => {
  return prefix(MI, pastPrecedent(past));
};
const negativeImperfectivePastPrecedent = (past: string): VerbForms => {
  return prefix('ن', imperfectivePastPrecedent(past));
};

const pastPrecedentPerfect = (past: string): VerbForms => {
  return participle(past, presentPerfect('بود'));
};
const negativePastPrecedentPerfect = (past: string): VerbForms => {
  return prefix('ن', pastPrecedentPerfect(past));
};
const subjunctivePastPrecedentPerfect = (past: string): VerbForms => {
  return participle(past, subjunctivePresentPerfect('بود'));
};
const negativeSubjunctivePastPrecedentPerfect = (past: string): VerbForms => {
  return prefix('ن', subjunctivePastPrecedentPerfect(past));
};
const grammaticalPastPrecedentPerfect = (past: string): VerbForms => {
  return prefix(`${past}ه بوده `, imperative(perfectivePresent('باش'), 'باشی', 'باش'));
};
const negativeGrammaticalPastPrecedentPerfect = (past: string): VerbForms => {
  return prefix('ن', grammaticalPastPrecedentPerfect(past));
};
const imperfectivePastPrecedentPerfect = (past: string): VerbForms => {
  return prefix(MI, pastPrecedentPerfect(past));
};
const negativeImperfectivePastPrecedentPerfect = (past: string): VerbForms => {
  return prefix('ن', imperfectivePastPrecedentPerfect(past));
};
const subjunctiveImperfectivePastPrecedentPerfect = (past: string): VerbForms => {
  return prefix(MI, subjunctivePastPrecedentPerfect(past));
};
const negativeSubjunctiveImperfectivePastPrecedentPerfect = (past: string): VerbForms => {
  return prefix('ن', subjunctiveImperfectivePastPrecedentPerfect(past));
};

const perfectiveFuture = (past: string): VerbForms => {
  return perfectivePresent('خواه').map((form) => {
    return `${form} ${past}`;
  });
};
const negativePerfectiveFuture = (past: string): VerbForms => {
  return prefix('ن', perfectiveFuture(past));
};
const imperfectiveFuture = (past: string): VerbForms => {
  return prefix(MI, perfectiveFuture(past));
};
const negativeImperfectiveFuture = (past: string): VerbForms => {
  return prefix('ن', imperfectiveFuture(past));
};
const futurePrecedent = (past: string): VerbForms => {
  return participle(past, perfectiveFuture('بود'));
};
const negativeFuturePrecedent = (past: string): VerbForms => {
  return prefix('ن', futurePrecedent(past));
};
const futurePrecedentImperfective = (past: string): VerbForms => {
  return prefix(MI, futurePrecedent(past));
};
const negativeFuturePrecedentImperfective = (past: string): VerbForms => {
  return prefix('ن', futurePrecedentImperfective(past));
};

/**
 * Every form hazm's `Conjugation.get_all` generates for a verb, given as `past#present` stems.
 *
 * @example
 * conjugateVerb('رفت#رو'); // ['رفتن', 'رفتم', 'رفتی', ..., 'می‌روم', ...]
 */
export const conjugateVerb = (stems: string): string[] => {
  const parts = stems.split('#');
  const [past, present] = parts;
  if (parts.length !== 2 || past === undefined || present === undefined) {
    throw new TypeError(`Expected verb stems as "past#present", got "${stems}"`);
  }
  // Passives: the participle plus the auxiliary conjugated from `شد` (past) or `شو` (present).
  const passive = (conjugate: (stem: string) => VerbForms): VerbForms => {
    return participle(past, conjugate('شد'));
  };
  const presentPassive = (conjugate: (stem: string) => VerbForms): VerbForms => {
    return participle(past, conjugate('شو'));
  };

  return [
    `${past}ن`,
    // Past
    ...perfectivePast(past),
    ...negativePerfectivePast(past),
    ...passive(perfectivePast),
    ...passive(negativePerfectivePast),
    ...imperfectivePast(past),
    ...negativeImperfectivePast(past),
    ...passive(imperfectivePast),
    ...passive(negativeImperfectivePast),
    ...pair(perfectivePast('داشت'), imperfectivePast(past)),
    ...pair(perfectivePast('داشت'), passive(imperfectivePast)),
    // Present perfect
    ...presentPerfect(past),
    ...negativePresentPerfect(past),
    ...subjunctivePresentPerfect(past),
    ...negativeSubjunctivePresentPerfect(past),
    ...grammaticalPresentPerfect(past),
    ...prefix('ن', grammaticalPresentPerfect(past)),
    ...passive(presentPerfect),
    ...passive(negativePresentPerfect),
    ...passive(subjunctivePresentPerfect),
    ...passive(negativeSubjunctivePresentPerfect),
    ...prefix(`${past}ه شده `, imperative(perfectivePresent('باش'), 'باشی', 'باش')),
    ...prefix(`${past}ه نشده `, imperative(perfectivePresent('باش'), 'باشی', 'باش')),
    ...imperfectivePresentPerfect(past),
    ...negativeImperfectivePresentPerfect(past),
    ...subjunctiveImperfectivePresentPerfect(past),
    ...negativeSubjunctiveImperfectivePresentPerfect(past),
    ...passive(imperfectivePresentPerfect),
    ...passive(negativeImperfectivePresentPerfect),
    ...passive(subjunctiveImperfectivePresentPerfect),
    ...passive(negativeSubjunctiveImperfectivePresentPerfect),
    ...pair(presentPerfect('داشت'), imperfectivePresentPerfect(past)),
    ...pair(presentPerfect('داشت'), passive(imperfectivePresentPerfect)),
    // Past perfect
    ...pastPrecedent(past),
    ...negativePastPrecedent(past),
    ...passive(pastPrecedent),
    ...passive(negativePastPrecedent),
    ...imperfectivePastPrecedent(past),
    ...negativeImperfectivePastPrecedent(past),
    ...passive(imperfectivePastPrecedent),
    ...passive(negativeImperfectivePastPrecedent),
    ...pair(perfectivePast('داشت'), imperfectivePastPrecedent(past)),
    ...pair(perfectivePast('داشت'), passive(imperfectivePastPrecedent)),
    ...pastPrecedentPerfect(past),
    ...negativePastPrecedentPerfect(past),
    ...subjunctivePastPrecedentPerfect(past),
    ...negativeSubjunctivePastPrecedentPerfect(past),
    ...grammaticalPastPrecedentPerfect(past),
    ...negativeGrammaticalPastPrecedentPerfect(past),
    ...passive(pastPrecedentPerfect),
    ...passive(negativePastPrecedentPerfect),
    ...passive(subjunctivePastPrecedentPerfect),
    ...subjunctivePastPrecedentPerfect('شد').map((form) => {
      return `${past}ه ن${form}`;
    }),
    ...passive(grammaticalPastPrecedentPerfect),
    ...passive(negativeGrammaticalPastPrecedentPerfect),
    ...imperfectivePastPrecedentPerfect(past),
    ...negativeImperfectivePastPrecedentPerfect(past),
    ...subjunctiveImperfectivePastPrecedentPerfect(past),
    ...negativeSubjunctiveImperfectivePastPrecedentPerfect(past),
    ...passive(imperfectivePastPrecedentPerfect),
    ...passive(negativeImperfectivePastPrecedentPerfect),
    ...passive(subjunctiveImperfectivePastPrecedentPerfect),
    ...subjunctiveImperfectivePastPrecedentPerfect('شد').map((form) => {
      return `${past}ه ن${form}`;
    }),
    ...pair(presentPerfect('داشت'), imperfectivePastPrecedentPerfect(past)),
    ...pair(presentPerfect('داشت'), passive(imperfectivePastPrecedentPerfect)),
    // Present
    ...perfectivePresent(present),
    ...negativePerfectivePresent(present),
    ...subjunctivePerfectivePresent(present),
    ...negativePerfectivePresent(present),
    ...grammaticalPerfectivePresent(present),
    ...negativeGrammaticalPerfectivePresent(present),
    ...presentPassive(perfectivePresent),
    ...presentPassive(negativePerfectivePresent),
    ...presentPassive(subjunctivePerfectivePresent),
    ...presentPassive(negativePerfectivePresent),
    ...participle(past, imperative(grammaticalPerfectivePresent('شو'), 'بشوی', 'بشو')),
    ...participle(past, imperative(negativeGrammaticalPerfectivePresent('شو'), 'نشوی', 'نشو')),
    ...imperfectivePresent(present),
    ...negativeImperfectivePresent(present),
    ...presentPassive(imperfectivePresent),
    ...presentPassive(negativeImperfectivePresent),
    ...pair(perfectivePresent('دار'), imperfectivePresent(present)),
    ...pair(perfectivePresent('دار'), presentPassive(imperfectivePresent)),
    // Future
    ...perfectiveFuture(past),
    ...negativePerfectiveFuture(past),
    ...passive(perfectiveFuture),
    ...passive(negativePerfectiveFuture),
    ...imperfectiveFuture(past),
    ...negativeImperfectiveFuture(past),
    ...passive(imperfectiveFuture),
    ...passive(negativeImperfectiveFuture),
    ...futurePrecedent(past),
    ...negativeFuturePrecedent(past),
    ...passive(futurePrecedent),
    ...passive(negativeFuturePrecedent),
    ...futurePrecedentImperfective(past),
    ...negativeFuturePrecedentImperfective(past),
    ...passive(futurePrecedentImperfective),
    ...passive(negativeFuturePrecedentImperfective),
  ];
};
