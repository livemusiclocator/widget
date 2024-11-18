export interface WidgetConfig {
  name: string;
  email: string;
  organization: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  timeFrame: 'tonight' | 'tomorrow' | 'weekend';
  range: number;
  displayElements: {
    artistName: boolean;
    venue: boolean;
    time: boolean;
    price: boolean;
    genre: boolean;
  };
  design: 'tablet' | 'website' | 'phone';
}