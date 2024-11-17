import { useQuery } from '@tanstack/react-query';
import { GigList } from './GigList';
import type { WidgetConfig, Gig } from './types';
import { format, addDays } from 'date-fns';

export function Widget({ config }: { config: WidgetConfig }) {
  // Calculate date range based on timeFrame
  const today = new Date();
  let dateFrom = format(today, 'yyyy-MM-dd');
  let dateTo = dateFrom;

  switch (config.timeFrame) {
    case 'tomorrow':
      dateFrom = format(addDays(today, 1), 'yyyy-MM-dd');
      dateTo = dateFrom;
      break;
    case 'weekend':
      // Find next Saturday
      const daysUntilSaturday = (6 - today.getDay() + 7) % 7;
      dateFrom = format(addDays(today, daysUntilSaturday), 'yyyy-MM-dd');
      dateTo = format(addDays(today, daysUntilSaturday + 1), 'yyyy-MM-dd');
      break;
  }

  const { data: gigs, isLoading } = useQuery({
    queryKey: ['gigs', config.location, dateFrom, dateTo],
    queryFn: async () => {
      const response = await fetch(
        `https://api.lml.live/gigs/query?location=${encodeURIComponent(config.location)}&date_from=${dateFrom}&date_to=${dateTo}`
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