import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Clock, Tag, Ticket } from 'lucide-react';
import { format } from 'date-fns';
import type { Gig, WidgetConfig } from './types';

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

interface WidgetProps {
  config: WidgetConfig;
}

export function Widget({ config }: WidgetProps) {
  const { data: gigs, isLoading, error } = useQuery({
    queryKey: ['gigs', config.location, config.timeFrame],
    queryFn: () => fetchGigs(config.location, config.timeFrame),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-gray-600">
        <div className="animate-pulse">Loading gigs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-red-600">
        <div>Failed to load gigs. Please try again later.</div>
      </div>
    );
  }

  const timeFrameText = {
    tonight: "Tonight's Gigs",
    tomorrow: "Today & Tomorrow's Gigs",
    weekend: "Weekend Gigs",
  }[config.timeFrame];

  const displayGigs = (gigs || []).slice(0, config.depth);

  return (
    <div className={`p-4 ${config.design === 'minimal' ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {timeFrameText}
        </h2>
        <span className="text-sm text-brand-blue flex items-center gap-1">
          <MapPin className="w-4 h-4" /> {config.range}km radius
        </span>
      </div>

      <div className="space-y-4">
        {displayGigs.map((gig) => (
          <div 
            key={gig.id}
            className={`
              ${config.design === 'minimal' 
                ? 'border-t border-gray-100 pt-4 first:border-t-0 first:pt-0' 
                : 'bg-white p-4 rounded-lg shadow-sm'
              }
            `}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                {config.displayElements.artistName && (
                  <h3 className="font-medium text-gray-900 truncate">
                    {gig.name}
                  </h3>
                )}
                
                {config.displayElements.venue && (
                  <a 
                    href={gig.venue.location_url || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-brand-blue flex items-center gap-1 mt-1"
                  >
                    <MapPin className="w-3 h-3" />
                    {gig.venue.name}
                  </a>
                )}

                {config.displayElements.time && (
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {new Date(`1970-01-01T${gig.start_time}`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                )}

                {config.displayElements.genre && gig.genre_tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {gig.genre_tags.map(tag => (
                      <span 
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-brand-blue bg-opacity-10 text-brand-blue"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {config.displayElements.price && gig.prices.length > 0 && (
                <div className="text-right">
                  <span className="inline-flex items-center text-sm font-medium text-gray-900">
                    <Ticket className="w-3 h-3 mr-1" />
                    {gig.prices[0].amount} {gig.prices[0].currency}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

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
  );
}