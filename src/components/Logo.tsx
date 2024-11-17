import logo from '../assets/logo.png';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <img 
      src={logo}
      alt="Live Music Locator" 
      className={`w-full h-full object-contain ${className}`}
    />
  );
}