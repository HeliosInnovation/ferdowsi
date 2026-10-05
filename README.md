# persian-kit

Tree-shakeable, zero-dependency helpers for working with Persian (Farsi) text, numbers and more. Works in any JavaScript runtime: Node, browsers, Deno, Bun, React, Vue and so on.

- 🌳 **Tree-shakeable**: ESM output with one file per module and `sideEffects: false`
- 📦 **Dual ESM + CJS** with bundled type declarations
- 🔒 **Strictly typed**, written in TypeScript

## Install

```sh
pnpm add persian-kit
# npm i persian-kit / yarn add persian-kit / bun add persian-kit
```

## Modules

Import from the root or from a module's own entry point. Both are tree-shakeable.

| Module                                            | Import                      | What it does                                                  |
| ------------------------------------------------- | --------------------------- | ------------------------------------------------------------- |
| [normalization](src/modules/normalization#readme) | `persian-kit/normalization` | Normalize text: characters, spacing, ZWNJ, digits, diacritics |
| [tokenization](src/modules/tokenization#readme)   | `persian-kit/tokenization`  | Split text into words and punctuation                         |
| [conjugation](src/modules/conjugation#readme)     | `persian-kit/conjugation`   | Conjugate a verb in every tense                               |

The modules are TypeScript ports of parts of [hazm](https://github.com/roshan-research/hazm) that need no word dictionary, with output identical to hazm's for those parts. Each module's README notes where it differs from hazm's defaults.

## Usage

```ts
import { normalize } from 'persian-kit/normalization';

normalize('اِعلام کَرد : « زمین لرزه ای به بُزرگیِ 6 دهم ریشتر ...»');
// → 'اعلام کرد: «زمین لرزه‌ای به بزرگی ۶ دهم ریشتر …»'

normalize('ساعت 18', { persianNumbers: false }); // → 'ساعت 18'
```

`normalize` is about 1.9 kB, and each step can be imported on its own. See each module's README for its options and output.

## Development

Requires Node 22+ and pnpm (`corepack enable`).

| Command              | What it does                                                  |
| -------------------- | ------------------------------------------------------------- |
| `pnpm test`          | Run tests once (`pnpm test:watch` for watch mode)             |
| `pnpm test:coverage` | Run tests with a 100% coverage threshold                      |
| `pnpm lint`          | Biome (TS/JS/JSON) + Prettier (Markdown/YAML) checks          |
| `pnpm lint:fix`      | Auto-fix lint and formatting                                  |
| `pnpm typecheck`     | Type-check library (no Node/DOM globals) and tests separately |
| `pnpm build`         | Build `dist/` with tsdown                                     |
| `pnpm check:package` | Validate `exports`/types with publint and arethetypeswrong    |
| `pnpm size`          | Check bundle size and tree-shaking with size-limit            |
| `pnpm validate`      | Everything above, in the same order CI runs it                |
| `pnpm changeset`     | Describe your change for the next release                     |

### Project layout

```
src/
  constants/   shared constants (e.g. ZWNJ)
  helpers/     shared, module-agnostic helpers
  types/       shared types
  modules/
    <module>/
      index.ts            public API (named exports only)
      types.ts            the module's types
      <module>.test.ts    one test file per module
      README.md
```

Files and folders are kebab-case, functions are arrow functions with block bodies, and type imports and exports are kept separate from value ones (enforced by Biome).

### Adding a module

1. Create `src/modules/<module>/` with its code, `index.ts`, `<module>.test.ts` and `README.md`.
2. Re-export it from `src/index.ts` (named exports only, no `export *`).
3. Add a `./<module>` entry to `exports` in `package.json`, following the existing entries.
4. Run `pnpm changeset`.

`src/index.test.ts` fails if steps 2 or 3 are missed.

### Releasing

Merging to `main` runs `.github/workflows/release.yml`, which needs this one-time setup in the GitHub repo:

- `NPM_TOKEN` secret: an npm automation token with publish rights to `persian-kit`.
- A GitHub App installed on the repo with _Contents_ and _Pull requests_ read/write. Store its ID in the `RELEASE_APP_ID` variable and its private key in the `RELEASE_APP_PRIVATE_KEY` secret. The release PR is opened with this app's token so that CI runs on it.

Dependencies are pinned to exact versions (`saveExact` in `pnpm-workspace.yaml`).

## License

MIT
