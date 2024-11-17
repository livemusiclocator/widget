import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Gig {
  id: string;
  name: string;
  venue: {
    name: string;
    latitude: number;
    longitude: number;
  };
  start_time: string;
  genre_tags: string[];
}

interface WidgetProps {
  location: string;
  range: number;
  maxGigs?: number;
}

export function Widget({ location, range, maxGigs = 5 }: WidgetProps) {
  const { data: gigs, isLoading } = useQuery({
    queryKey: ['gigs', location],
    queryFn: async () => {
      const today = format(new Date(), 'yyyy-MM-dd');
      const response = await fetch(
        `https://api.lml.live/gigs/query?location=${location}&date_from=${today}&date_to=${today}`
      );
      if (!response.ok) throw new Error('Failed to fetch gigs');
      return response.json();
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (!gigs?.length) return <div>No gigs found</div>;

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Tonight's Gigs</h2>
        <span className="text-sm text-blue-500 flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {range}km radius
        </span>
      </div>

      <div className="space-y-4">
        {gigs.slice(0, maxGigs).map(gig => (
          <div key={gig.id} className="border-t pt-4 first:border-t-0 first:pt-0">
            <h3 className="font-medium">{gig.name}</h3>
            <p className="text-sm text-gray-600">{gig.venue.name}</p>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              {new Date(`1970-01-01T${gig.start_time}`).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit'
              })}
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