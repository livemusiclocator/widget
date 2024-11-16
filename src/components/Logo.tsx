import React from 'react';

export function Logo({ className = '' }: { className?: string }) {
  const logoUrl = new URL('/logo.png', import.meta.url).href;
  
  return (
    <img 
      src={logoUrl}
      alt="Live Music Locator" 
      className={`w-full h-full object-contain ${className}`}
    />
  );
}