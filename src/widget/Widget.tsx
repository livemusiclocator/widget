import { useQuery } from '@tanstack/react-query';
import { GigList } from './GigList';
import type { WidgetConfig } from './types';
import type { Gig } from './types';

export function Widget({ config }: { config: WidgetConfig }) {
  const { data: gigs, isLoading } = useQuery({
    queryKey: ['gigs', config.location, config.timeFrame],
    queryFn: async () => {
      const response = await fetch(
        `https://api.lml.live/gigs/query?location=${config.location}&timeFrame=${config.timeFrame}`
      );
      if (!response.ok) throw new Error('Failed to fetch gigs');
      return response.json() as Promise<Gig[]>;
    }
  });

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (!gigs?.length) return <div className="p-4 text-center">No gigs found for this time period.</div>;

  return (
    <div className="lml-widget-container">
      <div className={`lml-widget p-4 ${config.design === 'minimal' ? 'bg-white' : 'bg-gray-50'}`}>
        <GigList 
          gigs={gigs} 
          config={config} 
          userLocation={config.coordinates.lat && config.coordinates.lng ? {
            lat: config.coordinates.lat,
            lon: config.coordinates.lng
          } : undefined}
        />
      </div>
    </div>
  );
}