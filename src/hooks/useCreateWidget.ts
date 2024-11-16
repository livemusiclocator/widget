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
      const widgetId = `widget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const embedUrl = `https://livemusiclocator.github.io/widget/${widgetId}`;
      const embedCode = `<iframe src="${embedUrl}" width="${config.width}" height="600" frameborder="0" title="Live Music Locator Widget"></iframe>`;

      // In production, you'd save the config to a backend service
      // For now, we'll just return the widget details
      return {
        widgetId,
        embedCode,
        config,
      } as CreateWidgetResponse;
    },
  });
}