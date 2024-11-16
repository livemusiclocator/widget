import React from 'react';
import { Widget } from '../widget/Widget';
import type { WidgetConfig } from '../types';

interface WidgetPreviewProps {
  config: WidgetConfig;
}

export function WidgetPreview({ config }: WidgetPreviewProps) {
  // Convert config to URL parameters
  const params = new URLSearchParams({
    location: config.location,
    timeFrame: config.timeFrame,
    depth: config.depth.toString(),
    width: config.width.toString(),
    range: config.range.toString(),
    showArtist: config.displayElements.artistName.toString(),
    showVenue: config.displayElements.venue.toString(),
    showTime: config.displayElements.time.toString(),
    showPrice: config.displayElements.price.toString(),
    showGenre: config.displayElements.genre.toString(),
    design: config.design,
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Live Preview</h2>
      
      <div className="max-h-[600px] overflow-y-auto rounded-lg border border-gray-200">
        <Widget config={config} />
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Embed Code</h3>
        <pre className="bg-gray-50 p-4 rounded-lg text-sm text-gray-800 overflow-x-auto">
          {`<iframe
  src="https://lml.live/widget/?${params.toString()}"
  width="${config.width}"
  height="600"
  frameborder="0"
  title="Live Music Locator Widget"
></iframe>`}
        </pre>
      </div>
    </div>
  );
}