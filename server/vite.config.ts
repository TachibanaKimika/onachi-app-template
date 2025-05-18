import { defineConfig } from 'vitest/config';

import path from 'path';

export default defineConfig({
  resolve: {
    alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }],
  },
  build: {
    ssr: true,
    lib: {
      formats: ['cjs'],
      entry: ['src/app.ts'],
      fileName: 'app.cjs',
    },
    rollupOptions: {
      external: ['@sequelize/core'],
    },
  },
  ssr: {
    target: 'node',
  },
  test: {
    globals: true,
    environment: 'node',
  },
});
