import React from 'react';
import { Music2, Copy, Check, ExternalLink } from 'lucide-react';
import { Widget } from '../widget/Widget';
import type { WidgetConfig } from '../types';

interface WidgetPreviewProps {
  config: WidgetConfig;
}

export function WidgetPreview({ config }: WidgetPreviewProps) {
  const [copied, setCopied] = React.useState(false);

  // Create preview URL and embed code
  const params = new URLSearchParams({
    location: config.location,
    timeFrame: config.timeFrame,
    range: config.range.toString(),
    depth: config.depth.toString(),
    width: config.width.toString(),
    design: config.design,
    ...Object.entries(config.displayElements).reduce((acc, [key, value]) => ({
      ...acc,
      [`show${key.charAt(0).toUpperCase() + key.slice(1)}`]: value.toString()
    }), {}),
    ...(config.coordinates ? {
      lat: config.coordinates.lat.toString(),
      lng: config.coordinates.lng.toString()
    } : {})
  });

  const widgetUrl = `https://lml.live/widget/?${params.toString()}`;
  const embedCode = `<iframe 
  src="${widgetUrl}"
  width="${config.width}"
  height="600"
  frameborder="0"
  title="Live Music Locator Widget"
></iframe>`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Music2 className="w-5 h-5 text-brand-blue" />
          Live Preview
        </h2>
        <a
          href={widgetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-brand-blue hover:bg-brand-blue/10 rounded-md transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          View Widget
        </a>
      </div>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
        <Widget config={config} />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">Embed Code</h3>
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            title="Copy embed code"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
        <pre className="bg-gray-50 p-4 rounded-lg text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap">
          {embedCode}
        </pre>
      </div>
    </div>
  );
}