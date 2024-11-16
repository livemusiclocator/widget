export interface Venue {
  id: string;
  name: string;
  address: string;
  location_url: string;
  latitude: number;
  longitude: number;
  website: string;
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
  description: string | null;
  status: string;
  ticket_status: string | null;
  information_tags: string[];
  genre_tags: string[];
  venue: Venue;
  sets: Set[];
  prices: Price[];
}

export interface WidgetConfig {
  name: string;
  location: string;
  timeFrame: 'tonight' | 'tomorrow' | 'weekend';
  depth: number;
  width: number;
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