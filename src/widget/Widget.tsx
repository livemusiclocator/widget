import { useQuery } from '@tanstack/react-query';
import { GigList } from './Giglist';
import type { WidgetConfig, Gig } from './types';
import { format, addDays, startOfDay } from 'date-fns';

interface WidgetProps {
  config: WidgetConfig;
}

export function Widget({ config }: WidgetProps) {
  const { data: gigs = [], isLoading, error } = useQuery<Gig[]>({
    queryKey: ['gigs', config.timeFrame],
    queryFn: async () => {
      const today = startOfDay(new Date());
      let dateFrom = format(today, 'yyyy-MM-dd');
      let dateTo = dateFrom;

      switch (config.timeFrame) {
        case 'tomorrow':
          dateFrom = format(addDays(today, 1), 'yyyy-MM-dd');
          dateTo = dateFrom;
          break;
        case 'weekend':
          let date = today;
          while (date.getDay() !== 6) {
            date = addDays(date, 1);
          }
          dateFrom = format(date, 'yyyy-MM-dd');
          dateTo = format(addDays(date, 1), 'yyyy-MM-dd');
          break;
      }

      // Always use 'melbourne' as the base location
      const params = new URLSearchParams({
        location: 'melbourne',
        date_from: dateFrom,
        date_to: dateTo
      });

      const response = await fetch(`https://api.lml.live/gigs/query?${params}`);
      if (!response.ok) throw new Error('Failed to fetch gigs');
      const data = await response.json();
      return data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div className="text-center p-4 text-gray-500">Loading gigs...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error loading gigs</div>;
  }

  if (!gigs.length) {
    return <div className="text-center p-4 text-gray-500">No gigs found for this time period.</div>;
  }

  return (
    <div className={`p-4 ${config.design === 'minimal' ? 'bg-white' : 'bg-gray-50'}`}>
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
}