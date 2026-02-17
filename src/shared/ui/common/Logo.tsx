import { clsx } from 'clsx';
import { Atom } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: number | string;
}

export function Logo({ className, size = 40 }: LogoProps) {
  // Unique ID for the gradient to avoid conflicts if multiple Logos are rendered (though usually fine for a singleton logo)
  // Using a fixed ID 'logo-gradient' for simplicity as per requirement.
  const gradientId = 'logo-gradient';

  return (
    <div className={clsx('relative flex items-center justify-center', className)} style={{ width: size, height: size }}>
      {/* SVG Gradient Definition - Hidden but functional */}
      <svg width='0' height='0' className='absolute block' aria-hidden='true'>
        <defs>
          <linearGradient id={gradientId} x1='0%' y1='100%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='#F59E0B' /> {/* Amber/Orange */}
            <stop offset='50%' stopColor='#EC4899' /> {/* Pink */}
            <stop offset='100%' stopColor='#8B5CF6' /> {/* Purple */}
          </linearGradient>
        </defs>
      </svg>

      {/* Main Icon with Gradient Stroke */}
      <Atom
        className='transform transition-transform duration-2000 ease-in-out hover:rotate-180'
        stroke={`url(#${gradientId})`}
        strokeWidth={1.5}
        size='100%' // Fill the container
        style={{
          filter: 'drop-shadow(0 0 6px rgba(236, 72, 153, 0.4))', // Soft pink glow to match gradient
        }}
      />
    </div>
  );
}
