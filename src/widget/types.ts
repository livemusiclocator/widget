export interface Gig {
  id: string;
  name: string;
  date: string;
  start_time: string;
  start_timestamp: string;
  venue: {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    location_url: string;
  };
  genre_tags: string[];
  prices: Array<{
    amount: number;
    currency: string;
  }>;
}

export interface WidgetConfig {
  name: string;
  email: string;
  organization: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  timeFrame: 'tonight' | 'tomorrow' | 'weekend';
  range: number;
  displayElements: {
    artistName: boolean;
    venue: boolean;
    time: boolean;
    price: boolean;
    genre: boolean;
  };
  design: 'tablet' | 'website' | 'phone';
}

export interface WidgetFormProps {
  config: WidgetConfig;
  onConfigChange: (updates: Partial<WidgetConfig>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  errors?: Record<string, string>;
}

export interface WidgetProps {
  config: WidgetConfig;
}</content></file>

<boltAction type="file" filePath="src/components/WidgetForm.tsx">
import React from 'react';
import { Music2 } from 'lucide-react';
import { LocationInput } from './LocationInput';
import type { WidgetFormProps } from '../widget/types';

export function WidgetForm({ config, onConfigChange, onSubmit, isLoading, errors = {} }: WidgetFormProps) {
  return (
    <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Music2 className="w-5 h-5 text-brand-blue" />
          Widget Configuration
        </h2>

        <LocationInput
          value={config.location}
          range={config.range}
          onChange={(location, coordinates) => {
            onConfigChange({ location, coordinates });
          }}
          onRangeChange={(range) => onConfigChange({ range })}
          error={errors.location}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Design Style</label>
          <div className="grid grid-cols-3 gap-4">
            {['website', 'tablet', 'phone'].map((style) => (
              <label
                key={style}
                className={`
                  flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer
                  ${config.design === style
                    ? 'border-brand-blue bg-brand-blue bg-opacity-5'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <input
                  type="radio"
                  name="design"
                  value={style}
                  checked={config.design === style}
                  onChange={(e) => onConfigChange({ design: e.target.value as 'website' | 'tablet' | 'phone' })}
                  className="sr-only"
                />
                <span className="capitalize">{style}</span>
                <span className="text-xs text-gray-500 mt-1">
                  {style === 'website' && 'Full-width layout'}
                  {style === 'tablet' && 'Medium-sized cards'}
                  {style === 'phone' && 'Compact view'}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating Widget...' : 'Generate Widget'}
        </button>
      </div>
    </form>
  );
}</content></file>

<boltAction type="file" filePath="src/widget/Widget.tsx">
import React from 'react';
import { GigList } from './Giglist';
import type { WidgetProps } from './types';
import { useQuery } from '@tanstack/react-query';

async function fetchGigs(location: string, timeFrame: string) {
  const today = new Date();
  let dateFrom = today.toISOString().split('T')[0];
  let dateTo = dateFrom;

  if (timeFrame === 'tomorrow') {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateFrom = tomorrow.toISOString().split('T')[0];
    dateTo = dateFrom;
  } else if (timeFrame === 'weekend') {
    const friday = new Date(today);
    friday.setDate(friday.getDate() + (5 - friday.getDay()));
    const sunday = new Date(friday);
    sunday.setDate(sunday.getDate() + 2);
    dateFrom = friday.toISOString().split('T')[0];
    dateTo = sunday.toISOString().split('T')[0];
  }

  const response = await fetch(
    `https://api.lml.live/gigs/query?location=melbourne&date_from=${dateFrom}&date_to=${dateTo}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch gigs');
  }

  return response.json();
}

export function Widget({ config }: WidgetProps) {
  const { data: gigs = [], isLoading, error } = useQuery({
    queryKey: ['gigs', config.location, config.timeFrame],
    queryFn: () => fetchGigs(config.location, config.timeFrame),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div className="text-center p-4">Loading gigs...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error loading gigs</div>;
  }

  return (
    <div className={`
      p-4 
      ${config.design === 'website' ? 'max-w-4xl mx-auto' : ''}
      ${config.design === 'tablet' ? 'max-w-2xl mx-auto' : ''}
      ${config.design === 'phone' ? 'max-w-sm mx-auto' : ''}
    `}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {config.timeFrame === 'tonight' ? "Tonight's Gigs" :
           config.timeFrame === 'tomorrow' ? "Tomorrow's Gigs" :
           "Weekend Gigs"}
        </h2>
        {config.coordinates && (
          <span className="text-sm text-brand-blue flex items-center gap-1">
            Within {config.range < 1 ? `${config.range * 1000}m` : `${config.range}km`}
          </span>
        )}
      </div>

      <GigList 
        gigs={gigs} 
        config={config}
        userLocation={config.coordinates ? {
          lat: config.coordinates.lat,
          lon: config.coordinates.lng
        } : undefined}
      />

      <div className="mt-4 text-center">
        <a 
          href="https://lml.live" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-gray-400 hover:text-brand-blue"
        >
          Powered by Live Music Locator
        </a>
      </div>
    </div>
  );
}</content></file>

<boltAction type="start">
<command>npm run dev</command>