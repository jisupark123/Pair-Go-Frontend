import { clsx } from 'clsx';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { isMobileOnly } from 'react-device-detect';

interface NavigationBackProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export function NavigationBack({ label = '뒤로', onClick, className = '' }: NavigationBackProps) {
  const router = useRouter();
  const handleBack = onClick ?? (() => router.back());
  const iconSize = isMobileOnly ? 'w-5 h-5' : 'w-6 h-6';

  return (
    <button
      className={clsx(
        'group flex items-center gap-2 rounded-lg p-2 transition-all duration-300 hover:bg-hextech-blue-900/20',
        'active:scale-95',
        className,
      )}
      aria-label='뒤로 가기'
      onClick={handleBack}
    >
      <ChevronLeft
        className={clsx(iconSize, 'text-hextech-blue-400 transition-colors group-hover:text-hextech-blue-300')}
      />
      <span className='font-medium tracking-wide text-hextech-blue-400 transition-colors group-hover:text-hextech-blue-300'>
        {label}
      </span>
    </button>
  );
}
