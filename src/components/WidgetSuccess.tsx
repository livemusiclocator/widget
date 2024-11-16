import React from 'react';
import { Check, Copy } from 'lucide-react';
import { Logo } from './Logo';

interface WidgetSuccessProps {
  widgetData: {
    widgetId: string;
    embedCode: string;
  };
}

export function WidgetSuccess({ widgetData }: WidgetSuccessProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(widgetData.embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="w-32 h-32 mx-auto mb-8 bg-brand-blue rounded-xl p-3">
          <Logo className="drop-shadow-lg" />
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Widget Created Successfully!</h2>
            <p className="text-gray-600">Your Live Music Locator widget is ready to be embedded.</p>
          </div>

          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Embed Code
            </label>
            <div className="relative">
              <pre className="bg-gray-50 rounded-lg p-4 text-sm text-gray-800 overflow-x-auto border border-gray-200">
                {widgetData.embedCode}
              </pre>
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <Copy className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm text-gray-600">
              Widget ID: <code className="bg-gray-100 px-2 py-1 rounded">{widgetData.widgetId}</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}