import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/widget-maker/', // Update this to match your repository name
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});