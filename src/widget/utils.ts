import type { WidgetConfig } from '../types';

export function parseWidgetConfig(): WidgetConfig {
  const params = new URLSearchParams(window.location.search);
  
  return {
    name: 'Live Music Widget',
    email: '',
    organization: '',
    location: params.get('location') || 'melbourne',
    coordinates: {
      lat: parseFloat(params.get('lat') || '0'),
      lng: parseFloat(params.get('lng') || '0')
    },
    depth: parseInt(params.get('depth') || '3', 10),
    width: parseInt(params.get('width') || '400', 10),
    timeFrame: (params.get('timeFrame') as 'tonight' | 'tomorrow' | 'weekend') || 'tonight',
    range: parseFloat(params.get('range') || '10'),
    displayElements: {
      artistName: params.get('showArtistName') !== 'false',
      venue: params.get('showVenue') !== 'false',
      time: params.get('showTime') !== 'false',
      price: params.get('showPrice') === 'true',
      genre: params.get('showGenre') === 'true'
    },
    design: (params.get('design') as 'minimal' | 'detailed') || 'minimal'
  };
}