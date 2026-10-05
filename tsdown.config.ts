import { defineConfig } from 'tsdown';

export default defineConfig({
  // Every `src/modules/<module>/index.ts` becomes a public subpath export (`ferdowsi/<module>`).
  entry: ['src/index.ts', 'src/modules/*/index.ts'],
  format: ['esm', 'cjs'],
  platform: 'neutral',
  tsconfig: 'tsconfig.lib.json',
  target: 'es2022',
  // Mirror the source tree in `dist` so bundlers can drop unused modules file-by-file.
  unbundle: true,
  fixedExtension: true,
  dts: true,
  clean: true,
});
