import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Widget } from './Widget';
import { parseWidgetConfig } from './utils';
import './styles.css';

const queryClient = new QueryClient();

// Get widget configuration from URL parameters
const config = parseWidgetConfig();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Widget config={config} />
    </QueryClientProvider>
  </StrictMode>
);