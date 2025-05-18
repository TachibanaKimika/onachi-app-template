import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    port: 24501,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://localhost:24500',
      },
      '/static': {
        changeOrigin: true,
        target: 'http://localhost:24500',
      },
    },
  },
});
