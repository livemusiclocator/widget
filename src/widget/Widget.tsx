import { useQuery } from '@tanstack/react-query';
import { MapPin } from 'lucide-react';
import { format } from 'date-fns';
import type { WidgetConfig } from './types';
import type { Gig } from './types';

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

  return (
    <div className={`p-4 ${config.design === 'minimal' ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="space-y-4">
        {gigs.slice(0, config.depth).map((gig) => (
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}