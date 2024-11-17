export interface WidgetConfig {
  name: string;
  email: string;
  organization: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  depth: number;
  width: number;
  timeFrame: 'tonight' | 'tomorrow' | 'weekend';
  range: number;
  displayElements: {
    artistName: boolean;
    venue: boolean;
    time: boolean;
    price: boolean;
    genre: boolean;
  };
  design: 'minimal' | 'detailed';
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  capacity: number | null;
  website: string;
  postcode: string;
  vibe: string | null;
  tags: string[];
  location_url: string | null;
  latitude: number;
  longitude: number;
}

export interface Act {
  id: string;
  name: string;
  genres: string[] | null;
}

export interface Set {
  start_time: string | null;
  start_timestamp: string | null;
  duration: string | null;
  finish_time: string | null;
  finish_timestamp: string | null;
  act: Act;
}

export interface Price {
  amount: number;
  currency: string;
}

export interface Gig {
  id: string;
  name: string;
  date: string;
  ticketing_url: string | null;
  start_time: string;
  start_timestamp: string;
  duration: string | null;
  finish_time: string | null;
  finish_timestamp: string | null;
  description: string | null;
  status: string;
  ticket_status: string | null;
  series: string | null;
  category: string | null;
  information_tags: string[];
  genre_tags: string[];
  venue: Venue;
  sets: Set[];
  prices: Price[];
}