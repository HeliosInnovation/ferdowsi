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

## Usage

```ts
import { toEnglishDigits, toPersianDigits } from 'persian-kit';
// or import only one module:
import { toPersianDigits } from 'persian-kit/digits';

toPersianDigits('1403/01/15'); // '۱۴۰۳/۰۱/۱۵'
toEnglishDigits('۰۹۱۲٣٤٥'); // '0912345' (Persian and Arabic-Indic digits)
```

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

### Adding a module

1. Create `src/<module>/<module>.ts` with tests next to it in `src/<module>/<module>.test.ts`.
2. Re-export it from `src/<module>/index.ts` and from `src/index.ts` (named exports only, no `export *`).
3. Add a `./<module>` entry to `exports` in `package.json`, following the existing `./digits` entry.
4. Run `pnpm changeset`.

`src/index.test.ts` fails if steps 2 or 3 are missed.

### Releasing

Merging to `main` runs `.github/workflows/release.yml`, which needs this one-time setup in the GitHub repo:

- `NPM_TOKEN` secret: an npm automation token with publish rights to `persian-kit`.
- A GitHub App installed on the repo with _Contents_ and _Pull requests_ read/write. Store its ID in the `RELEASE_APP_ID` variable and its private key in the `RELEASE_APP_PRIVATE_KEY` secret. The release PR is opened with this app's token so that CI runs on it.

Dependencies are pinned to exact versions (`saveExact` in `pnpm-workspace.yaml`).

## License

MIT
