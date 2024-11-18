import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/widget/',
  build: {
    rollupOptions: {
      input: {
        maker: resolve(__dirname, 'maker.html'),
        widget: resolve(__dirname, 'widget.html')
      }
    }
  }
});