{/* Previous imports remain the same */}

export function Widget({ config }: WidgetProps) {
  // Previous code remains the same until the return statement

  return (
    <div className={`
      p-4 
      ${config.design === 'website' ? 'max-w-4xl mx-auto' : ''}
      ${config.design === 'tablet' ? 'max-w-2xl mx-auto' : ''}
      ${config.design === 'phone' ? 'max-w-sm mx-auto' : ''}
    `}>
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