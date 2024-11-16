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
      
      // Use GitHub Pages URL
      const embedUrl = `https://livemusiclocator.github.io/widget/widget/?${new URLSearchParams({
        location: config.location,
        timeFrame: config.timeFrame,
        range: config.range.toString(),
        depth: config.depth.toString(),
        width: config.width.toString(),
        design: config.design,
        ...Object.entries(config.displayElements).reduce((acc, [key, value]) => ({
          ...acc,
          [`show${key.charAt(0).toUpperCase() + key.slice(1)}`]: value.toString()
        }), {})
      }).toString()}`;

      const embedCode = `<iframe src="${embedUrl}" width="${config.width}" height="600" frameborder="0" title="Live Music Locator Widget"></iframe>`;

      return {
        widgetId,
        embedCode,
        config,
      } as CreateWidgetResponse;
    },
  });
}