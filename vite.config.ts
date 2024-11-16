import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/widget/', // Match GitHub Pages repository name
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        widget: 'gigwidget.html'
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@tanstack/react-query'],
          widget: ['./src/widget/index.tsx']
        }
      }
    }
  }
});