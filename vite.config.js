import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  root: './',
  plugins: [react()],
  resolve: {
    alias: {
      '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true
  }
})
