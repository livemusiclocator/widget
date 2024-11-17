import type { WidgetConfig } from './widget/types';

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

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