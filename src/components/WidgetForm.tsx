import React from 'react';
import { Music2, Mail, Building2, Layout, Calendar, Settings2, Sliders } from 'lucide-react';
import { LocationInput } from './LocationInput';
import type { WidgetConfig } from '../types';

interface WidgetFormProps {
  config: WidgetConfig;
  onConfigChange: (updates: Partial<WidgetConfig>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  errors?: Record<string, string>;
}

export function WidgetForm({ config, onConfigChange, onSubmit, isLoading, errors = {} }: WidgetFormProps) {
  return (
    <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-brand-blue" />
          Widget Configuration
        </h2>
        
        <div className="space-y-4">
          {/* Basic Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <Music2 className="w-4 h-4 text-brand-blue" />
              Widget Name *
            </label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => onConfigChange({ name: e.target.value })}
              className={`
                mt-1 block w-full rounded-md shadow-sm sm:text-sm
                ${errors.name 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-brand-blue focus:ring-brand-blue'
                }
              `}
              placeholder="My Gig Widget"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-blue" />
              Email *
            </label>
            <input
              type="email"
              value={config.email}
              onChange={(e) => onConfigChange({ email: e.target.value })}
              className={`
                mt-1 block w-full rounded-md shadow-sm sm:text-sm
                ${errors.email 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-brand-blue focus:ring-brand-blue'
                }
              `}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-brand-blue" />
              Organization
            </label>
            <input
              type="text"
              value={config.organization}
              onChange={(e) => onConfigChange({ organization: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue sm:text-sm"
              placeholder="Your Organization"
            />
          </div>

          <LocationInput
            value={config.location}
            range={config.range}
            onChange={(location, coordinates) => 
              onConfigChange({ location, coordinates })
            }
            onRangeChange={(range) => onConfigChange({ range })}
            error={errors.location}
          />

          {/* Display Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <Layout className="w-4 h-4 text-brand-blue" />
                Display Depth
              </label>
              <select
                value={config.depth}
                onChange={(e) => onConfigChange({ depth: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue sm:text-sm"
              >
                {[2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} Events</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <Layout className="w-4 h-4 text-brand-blue" />
                Widget Width
              </label>
              <input
                type="number"
                min="300"
                max="800"
                value={config.width}
                onChange={(e) => onConfigChange({ width: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-blue" />
              Time Frame
            </label>
            <select
              value={config.timeFrame}
              onChange={(e) => onConfigChange({ timeFrame: e.target.value as any })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue sm:text-sm"
            >
              <option value="tonight">Tonight</option>
              <option value="tomorrow">Today and Tomorrow</option>
              <option value="weekend">Through Weekend</option>
            </select>
          </div>

          {/* Display Elements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-blue" />
              Display Elements
            </label>
            <div className="space-y-2">
              {Object.entries(config.displayElements).map(([key, value]) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => onConfigChange({
                      displayElements: {
                        ...config.displayElements,
                        [key]: e.target.checked,
                      },
                    })}
                    className="rounded border-gray-300 text-brand-blue shadow-sm focus:border-brand-blue focus:ring-brand-blue"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Design Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Design Style</label>
            <div className="grid grid-cols-2 gap-4">
              {['minimal', 'detailed'].map((style) => (
                <label
                  key={style}
                  className={`
                    flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer
                    ${config.design === style
                      ? 'border-brand-blue bg-brand-blue bg-opacity-5'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="design"
                    value={style}
                    checked={config.design === style}
                    onChange={(e) => onConfigChange({ design: e.target.value as any })}
                    className="sr-only"
                  />
                  <span className="capitalize">{style}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || Object.keys(errors).length > 0}
        className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Generating Widget...' : 'Generate Widget'}
      </button>

      {Object.keys(errors).length > 0 && (
        <p className="mt-2 text-sm text-red-600">
          Please fix the errors above before generating the widget.
        </p>
      )}
    </form>
  );
}