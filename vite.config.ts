import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: './src/render',
  base: './',
  publicDir: './assets/',
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src/render'),
      'package.json': path.resolve(__dirname, 'package.json'),
    },
  },
  plugins: [
    react(),
    eslint({
      include: ['./src/**/*.ts', './src/**/*.tsx'],
      fix: true,
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, './dist/render'),
    emptyOutDir: true,
  },
  server: {
    port: 14843,
  },
});
