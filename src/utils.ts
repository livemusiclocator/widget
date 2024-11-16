import type { WidgetConfig } from '../types';

// Calculate distance between two points using the Haversine formula
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function parseWidgetConfig(): WidgetConfig {
  const params = new URLSearchParams(window.location.search);
  
  return {
    name: params.get('name') || 'Live Music Widget',
    email: params.get('email') || '',
    organization: params.get('organization') || '',
    location: params.get('location') || 'melbourne',
    coordinates: {
      lat: parseFloat(params.get('lat') || '0'),
      lng: parseFloat(params.get('lng') || '0')
    },
    timeFrame: (params.get('timeFrame') as 'tonight' | 'tomorrow' | 'weekend') || 'tonight',
    depth: parseInt(params.get('depth') || '3', 10),
    width: parseInt(params.get('width') || '400', 10),
    range: parseInt(params.get('range') || '10', 10),
    displayElements: {
      artistName: params.get('showArtist') !== 'false',
      venue: params.get('showVenue') !== 'false',
      time: params.get('showTime') !== 'false',
      price: params.get('showPrice') !== 'false',
      genre: params.get('showGenre') !== 'false',
    },
    design: (params.get('design') as 'minimal' | 'detailed') || 'minimal',
  };
}