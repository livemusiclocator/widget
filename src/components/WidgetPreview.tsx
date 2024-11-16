import React from 'react';
import { Music2, Calendar, MapPin } from 'lucide-react';

export function WidgetPreview() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Music2 className="w-5 h-5 text-brand-blue" />
        Live Preview
      </h2>
      
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Tonight's Gigs</h3>
            <span className="text-sm text-brand-blue flex items-center gap-1">
              <MapPin className="w-4 h-4" /> 5mi radius
            </span>
          </div>
          
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-t border-gray-100 py-3 first:border-t-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">Sample Artist {i}</h4>
                  <p className="text-sm text-gray-600">Sample Venue</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-brand-blue">8:00 PM</p>
                  <p className="text-sm text-gray-500">$20</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 text-center">
          This is a preview. The actual widget will display real event data.
        </p>
      </div>
    </div>
  );
}