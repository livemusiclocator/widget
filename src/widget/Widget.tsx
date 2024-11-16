import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { GigList } from './GigList';
import { parseWidgetConfig } from './utils';
import type { Gig } from './types';

async function fetchGigs(location: string, timeFrame: string): Promise<Gig[]> {
  const today = new Date();
  let dateTo = new Date();
  
  switch (timeFrame) {
    case 'tonight':
      // Keep same day
      break;
    case 'tomorrow':
      dateTo.setDate(today.getDate() + 1);
      break;
    case 'weekend':
      // Find next Friday and Saturday
      const dayOfWeek = today.getDay();
      const daysUntilFriday = (5 + 7 - dayOfWeek) % 7;
      dateTo.setDate(today.getDate() + daysUntilFriday + 1); // Include Saturday
      break;
  }

  const response = await fetch(
    `https://api.lml.live/gigs/query?` +
    `location=${encodeURIComponent(location)}&` +
    `date_from=${format(today, 'yyyy-MM-dd')}&` +
    `date_to=${format(dateTo, 'yyyy-MM-dd')}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch gigs');
  }

  return response.json();
}

export function Widget() {
  const config = parseWidgetConfig();

  const { data: gigs, isLoading, error } = useQuery({
    queryKey: ['gigs', config.location, config.timeFrame],
    queryFn: () => fetchGigs(config.location, config.timeFrame),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="lml-widget-container min-h-[200px] flex items-center justify-center text-gray-600">
        <div className="animate-pulse">Loading gigs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lml-widget-container min-h-[200px] flex items-center justify-center text-red-600">
        <div>Failed to load gigs. Please try again later.</div>
      </div>
    );
  }

  const timeFrameText = {
    tonight: "Tonight's Gigs",
    tomorrow: "Today & Tomorrow's Gigs",
    weekend: "Weekend Gigs",
  }[config.timeFrame];

  return (
    <div className="lml-widget lml-widget-container">
      <div className={`${config.design === 'minimal' ? 'bg-white' : 'bg-gray-50'} p-4 rounded-lg shadow-sm`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {timeFrameText}
          </h2>
          <span className="text-sm text-brand-blue flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {config.location}
          </span>
        </div>

        <GigList 
          gigs={gigs || []} 
          config={config}
        />

        <div className="mt-4 text-center">
          <a 
            href={`https://lml.live/gigs?location=${encodeURIComponent(config.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-brand-blue transition-colors"
          >
            Powered by Live Music Locator
          </a>
        </div>
      </div>
    </div>
  );
}