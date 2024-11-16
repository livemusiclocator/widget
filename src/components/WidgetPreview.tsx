import React from 'react';
import { Music2 } from 'lucide-react';
import { Widget } from '../widget/Widget';
import type { WidgetConfig } from '../types';

interface WidgetPreviewProps {
  config: WidgetConfig;
}

export function WidgetPreview({ config }: WidgetPreviewProps) {
  const widgetId = `widget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const embedUrl = `https://livemusiclocator.github.io/widget/${widgetId}`;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-6">
        <Music2 className="w-5 h-5 text-brand-blue" />
        Live Preview
      </h2>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Widget config={config} />
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Embed Code</h3>
        <pre className="bg-gray-50 p-4 rounded-lg text-sm text-gray-800 overflow-x-auto">
          {`<iframe
  src="${embedUrl}"
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