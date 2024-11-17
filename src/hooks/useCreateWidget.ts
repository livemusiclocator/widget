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
      // Create URL parameters from config
      const params = new URLSearchParams({
        location: config.location,
        timeFrame: config.timeFrame,
        range: config.range.toString(),
        depth: config.depth.toString(),
        width: config.width.toString(),
        design: config.design,
        showArtistName: config.displayElements.artistName.toString(),
        showVenue: config.displayElements.venue.toString(),
        showTime: config.displayElements.time.toString(),
        showPrice: config.displayElements.price.toString(),
        showGenre: config.displayElements.genre.toString(),
        ...(config.coordinates ? {
          lat: config.coordinates.lat.toString(),
          lng: config.coordinates.lng.toString()
        } : {})
      });

      // Use the GitHub Pages URL for the widget
      const widgetUrl = `https://livemusiclocator.github.io/widget/widget?${params.toString()}`;

      const embedCode = `<iframe 
  src="${widgetUrl}"
  width="${config.width}"
  height="600"
  frameborder="0"
  title="Live Music Locator Widget"
></iframe>`;

      return {
        widgetId: `widget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        embedCode,
        config,
      };
    },
  });
}