import { defineConfig } from 'tsup';
import path from 'path';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  shims: true,
  entry: ['src/app.ts'],
  format: ['cjs'],
  outDir: 'dist',
  clean: true,
  target: 'node20',
  splitting: false,
  sourcemap: isDev,
  minify: false,
  dts: false,
  treeshake: false,
  noExternal: isDev ? [] : undefined,
  esbuildOptions(options) {
    options.alias = {
      '~': path.resolve(__dirname, 'src'),
    };
  },
});
