import { useMutation } from '@tanstack/react-query';
import type { WidgetConfig } from '../types';

interface CreateWidgetResponse {
  widgetId: string;
  embedCode: string;
  config: WidgetConfig;
}

export function useCreateWidget() {
  return useMutation({
    mutationFn: async (config: WidgetConfig) => {
      // Since we're using GitHub Pages (static hosting), we'll simulate the API response
      // In a production environment, you'd want to use a real backend service
      const widgetId = `widget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const embedCode = `<iframe src="https://${window.location.hostname}/widget/${widgetId}" width="${config.width}" height="500" frameborder="0"></iframe>`;

      return {
        widgetId,
        embedCode,
        config,
      } as CreateWidgetResponse;
    },
  });
}