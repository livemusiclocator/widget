import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // This ensures assets are loaded from root path
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
    },
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate assets with hash for cache busting
    assetFileNames: 'assets/[name]-[hash][extname]',
    chunkFileNames: 'assets/[name]-[hash].js',
    entryFileNames: 'assets/[name]-[hash].js'
  }
});