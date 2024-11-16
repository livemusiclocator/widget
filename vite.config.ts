import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/widget/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});