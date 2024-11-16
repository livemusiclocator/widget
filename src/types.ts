export interface WidgetConfig {
  name: string;
  email: string;
  organization: string;
  location: string;
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