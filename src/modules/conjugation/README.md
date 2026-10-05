# conjugation

Conjugates Persian verbs in every tense, mood, voice and person. A port of [hazm](https://github.com/roshan-research/hazm)'s `Conjugation.get_all` with identical output.

## Import

```ts
import { conjugateVerb } from 'persian-kit/conjugation';
```

## Usage

```ts
conjugateVerb('دید#بین');
// → ['دیدن', 'دیدم', 'دیدی', 'دید', …, 'می‌بینم', …, 'دیده نمی‌شده خواهند بود']
```

## `conjugateVerb(stems)`

| Parameter | Type     | Description                                                        |
| --------- | -------- | ------------------------------------------------------------------ |
| `stems`   | `string` | Past and present stems joined by `#`, e.g. `'رفت#رو'`, `'دید#بین'` |

Throws `TypeError` when `stems` is not `past#present`.

## Output schema

**Returns** `string[]`: always 609 forms, in hazm's order. Forms shared by two tenses appear twice, as in hazm.

1. The infinitive (`دیدن`).
2. 98 tenses in hazm's order: past, present perfect, past perfect, present, then future. Each comes in positive, negative and passive variants.
3. Each tense lists six persons: من، تو، او، ما، شما، ایشان. Perfect tenses have seven, adding the short third person (`دیده`).

| Tense example           | Forms                                                   |
| ----------------------- | ------------------------------------------------------- |
| Simple past             | `دیدم`, `دیدی`, `دید`, `دیدیم`, `دیدید`, `دیدند`        |
| Past progressive        | `داشتم می‌دیدم`, …                                      |
| Present perfect         | `دیده‌ام`, `دیده‌ای`, `دیده است`, `دیده`, `دیده‌ایم`, … |
| Present subjunctive     | `ببینم`, `ببینی`, …                                     |
| Imperative              | `ببینم`, `ببین`, …                                      |
| Simple future (passive) | `دیده خواهم شد`, …                                      |
