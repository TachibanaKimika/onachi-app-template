import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';

import path from 'path';

export default defineConfig({
  plugins: [
    dts({
      entryRoot: path.join(__dirname, 'src'),
      exclude: ['**/*.test.(ts|tsx)'],
    }),
  ],
  resolve: {
    alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }],
  },
  build: {
    ssr: true,
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        typings: path.resolve(__dirname, 'src/typings.ts'),
      },
    },
    rollupOptions: {
      output: [
        {
          format: 'cjs',
          dir: 'dist',
          entryFileNames: '[name].cjs',
        },
        {
          format: 'esm',
          dir: 'dist',
          entryFileNames: '[name].js',
        },
      ],
    },
  },
  ssr: {
    target: 'node',
  },
  test: {
    // setupFiles: ['./scripts/setupTest.ts'],
    globals: true,
    environment: 'node',
  },
});
