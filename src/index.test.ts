import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import * as root from './index';

// Every directory in `src/modules` is a public module, exposed both at the root and as
// `persian-kit/<module>`.
const modules = readdirSync(new URL('./modules', import.meta.url), { withFileTypes: true })
  .filter((entry) => {
    return entry.isDirectory();
  })
  .map((entry) => {
    return entry.name;
  })
  .sort();

const { exports } = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
) as { exports: Record<string, unknown> };

describe('public API', () => {
  it('has no subpath exports without a matching module', () => {
    const subpaths = Object.keys(exports)
      .filter((key) => {
        return key !== '.' && key !== './package.json';
      })
      .map((key) => {
        return key.slice('./'.length);
      })
      .sort();

    expect(subpaths).toEqual(modules);
  });

  it.each(modules)('exposes "%s" as a subpath export pointing at its build output', (name) => {
    const output = `./dist/modules/${name}/index`;
    expect(exports[`./${name}`]).toEqual({
      import: { types: `${output}.d.mts`, default: `${output}.mjs` },
      require: { types: `${output}.d.cts`, default: `${output}.cjs` },
    });
  });

  it.each(modules)('has a non-empty public API for "%s"', async (name) => {
    const moduleExports: Record<string, unknown> = await import(`./modules/${name}/index.ts`);

    expect(Object.keys(moduleExports).length).toBeGreaterThan(0);
  });

  it('exports exactly the union of all modules at the root', async () => {
    const allModuleExports: Record<string, unknown>[] = await Promise.all(
      modules.map((name) => {
        return import(`./modules/${name}/index.ts`);
      }),
    );

    expect({ ...root }).toEqual(Object.assign({}, ...allModuleExports));
  });
});
