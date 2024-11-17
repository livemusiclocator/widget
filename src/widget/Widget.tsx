import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Clock, Tag, Ticket } from 'lucide-react';
import { format } from 'date-fns';
import type { WidgetConfig } from '../types';

interface Gig {
  id: string;
  name: string;
  venue: {
    name: string;
    latitude: number;
    longitude: number;
    location_url: string;
  };
  start_time: string;
  genre_tags: string[];
  prices: Array<{ amount: number; currency: string }>;
}

function formatTime(time: string) {
  return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function Widget({ config }: { config: WidgetConfig }) {
  const { data: gigs, isLoading } = useQuery({
    queryKey: ['gigs', config.location, config.timeFrame],
    queryFn: async () => {
      const today = format(new Date(), 'yyyy-MM-dd');
      const response = await fetch(
        `https://api.lml.live/gigs/query?location=${config.location}&date_from=${today}&date_to=${today}`
      );
      if (!response.ok) throw new Error('Failed to fetch gigs');
      return response.json() as Promise<Gig[]>;
    }
  });

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (!gigs?.length) return <div className="p-4 text-center">No gigs found for this time period.</div>;

  const displayGigs = gigs.slice(0, config.depth);

  return (
    <div className={`p-4 ${config.design === 'minimal' ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {config.timeFrame === 'tonight' ? "Tonight's Gigs" :
           config.timeFrame === 'tomorrow' ? "Tomorrow's Gigs" :
           "Weekend Gigs"}
        </h2>
        <span className="text-sm text-brand-blue flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {config.range < 1 ? `${config.range * 1000}m` : `${config.range}km`} radius
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
                    {formatTime(gig.start_time)}
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

      <div className="mt-4 text-center text-xs text-gray-400">
        <a href="https://lml.live" target="_blank" rel="noopener noreferrer">
          Powered by Live Music Locator
        </a>
      </div>
    </div>
  );
}