import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin } from 'lucide-react';
import { format } from 'date-fns';
import type { WidgetConfig } from '../types';
import { GigList } from './GigList';

async function fetchGigs(location: string, timeFrame: string) {
  const today = format(new Date(), 'yyyy-MM-dd');
  let dateTo = today;
  
  switch (timeFrame) {
    case 'tomorrow':
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateTo = format(tomorrow, 'yyyy-MM-dd');
      break;
    case 'weekend':
      const now = new Date();
      const daysUntilWeekend = 5 - now.getDay(); // Friday
      const weekend = new Date();
      weekend.setDate(now.getDate() + daysUntilWeekend);
      dateTo = format(weekend, 'yyyy-MM-dd');
      break;
  }

  const response = await fetch(
    `https://api.lml.live/gigs/query?location=${encodeURIComponent(location)}&date_from=${today}&date_to=${dateTo}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch gigs');
  }

  return response.json();
}

export function Widget({ config }: { config: WidgetConfig }) {
  const { data: gigs, isLoading, error } = useQuery({
    queryKey: ['gigs', config.location, config.timeFrame, config.range],
    queryFn: () => fetchGigs(config.location, config.timeFrame),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });

  const timeFrameText = React.useMemo(() => {
    switch (config.timeFrame) {
      case 'tonight':
        return "Tonight's Gigs";
      case 'tomorrow':
        return "Today & Tomorrow's Gigs";
      case 'weekend':
        return "Weekend Gigs";
      default:
        return "Live Music";
    }
  }, [config.timeFrame]);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading gigs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load gigs. Please try again later.
      </div>
    );
  }

  if (!gigs?.length) {
    return (
      <div className="p-8 text-center text-gray-500">
        No gigs found for this time period.
      </div>
    );
  }

  const rangeDisplay = config.range >= 100 ? 'All gigs' : 
    config.range < 1 ? `${(config.range * 1000).toFixed(0)}m radius` : 
    `${config.range}km radius`;

  return (
    <div className={`p-4 ${config.design === 'minimal' ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {timeFrameText}
        </h2>
        <span className="text-sm text-brand-blue flex items-center gap-1">
          <MapPin className="w-4 h-4" /> 
          {rangeDisplay}
        </span>
      </div>

      <GigList 
        gigs={gigs.slice(0, config.depth)} 
        config={config}
        userLocation={config.coordinates ? 
          { lat: config.coordinates.lat, lon: config.coordinates.lng } : 
          undefined
        }
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
}