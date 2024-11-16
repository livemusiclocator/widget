import React from 'react';
import { MapPin, Clock, Tag, Ticket } from 'lucide-react';
import type { Gig, WidgetConfig } from './types';
import { calculateDistance } from './utils';

interface GigListProps {
  gigs: Gig[];
  config: WidgetConfig;
  userLocation?: { lat: number; lon: number };
}

function formatTime(time: string) {
  return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function GigList({ gigs, config, userLocation }: GigListProps) {
  const filteredGigs = userLocation
    ? gigs.filter(gig => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lon,
          gig.venue.latitude,
          gig.venue.longitude
        );
        return distance <= config.range;
      })
    : gigs;

  const displayGigs = filteredGigs.slice(0, config.depth);

  return (
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
              <h3 className="font-medium text-gray-900 truncate">
                {gig.name}
              </h3>
              
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
  );
}