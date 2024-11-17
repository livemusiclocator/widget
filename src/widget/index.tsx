import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Widget } from './Widget';
import { parseWidgetConfig } from '../utils';
import '../index.css';

const queryClient = new QueryClient();
const config = parseWidgetConfig();

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Widget config={config} />
      </QueryClientProvider>
    </StrictMode>
  );
}