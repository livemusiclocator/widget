import React, { useState } from 'react';
import { MapPin, Crosshair } from 'lucide-react';

// Predefined ranges in meters
export const DISTANCE_RANGES = [
  { label: '200m', value: 0.2 },
  { label: '500m', value: 0.5 },
  { label: '1km', value: 1 },
  { label: '2km', value: 2 },
  { label: 'Custom', value: 'custom' }
] as const;

interface LocationInputProps {
  value: string;
  range: number;
  onChange: (location: string, coordinates: { lat: number; lng: number }) => void;
  onRangeChange: (range: number) => void;
  error?: string;
}

export function LocationInput({ value, range, onChange, onRangeChange, error }: LocationInputProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [customRange, setCustomRange] = useState<number>(5);
  const [showCustomRange, setShowCustomRange] = useState(false);

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setUserLocation({ lat, lng });
        onChange('Current Location', { lat, lng });
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsGettingLocation(false);
      }
    );
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'custom') {
      setShowCustomRange(true);
      onRangeChange(customRange);
    } else {
      setShowCustomRange(false);
      onRangeChange(parseFloat(selectedValue));
    }
  };

  const handleCustomRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCustomRange(value);
    onRangeChange(value);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand-blue" />
          Location *
        </label>
        
        <div className="mt-1">
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:opacity-50"
          >
            <Crosshair className="w-4 h-4 mr-2" />
            {isGettingLocation ? 'Getting location...' : 'Use my location'}
          </button>
        </div>

        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}

        {userLocation && (
          <p className="mt-1 text-xs text-gray-500">
            Found: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Search Range
        </label>
        <select
          value={showCustomRange ? 'custom' : range}
          onChange={handleRangeChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue sm:text-sm"
        >
          {DISTANCE_RANGES.map(({ label, value }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>

        {showCustomRange && (
          <div className="mt-2">
            <input
              type="number"
              min="0.1"
              max="100"
              step="0.1"
              value={customRange}
              onChange={handleCustomRangeChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue sm:text-sm"
              placeholder="Enter distance in km"
            />
          </div>
        )}
      </div>
    </div>
  );
}