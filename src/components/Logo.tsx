import { type FC } from 'react';
import logo from '../assets/logo.png';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className = '' }) => {
  return (
    <img 
      src={logo}
      alt="Live Music Locator" 
      className={`w-full h-full object-contain ${className}`}
    />
  );
};