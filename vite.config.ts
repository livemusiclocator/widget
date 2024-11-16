import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/widget/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        widget: 'widget.html'
      }
    }
  }
});