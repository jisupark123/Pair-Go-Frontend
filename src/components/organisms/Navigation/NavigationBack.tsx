import { clsx } from 'clsx';
import { ChevronLeft } from 'lucide-react';
import { isMobileOnly } from 'react-device-detect';
import { useNavigate } from 'react-router';

interface NavigationBackProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export function NavigationBack({ label = '뒤로', onClick, className = '' }: NavigationBackProps) {
  const navigate = useNavigate();
  const handleBack = onClick ?? (() => navigate(-1));
  const iconSize = isMobileOnly ? 'w-5 h-5' : 'w-6 h-6';

  return (
    <button
      className={clsx(
        'p-2 rounded-lg hover:bg-hextech-blue-900/20 transition-all duration-300 flex items-center gap-2 group',
        'active:scale-95',
        className,
      )}
      aria-label='뒤로 가기'
      onClick={handleBack}
    >
      <ChevronLeft
        className={clsx(iconSize, 'text-hextech-blue-400 group-hover:text-hextech-blue-300 transition-colors')}
      />
      <span className='text-hextech-blue-400 font-medium group-hover:text-hextech-blue-300 transition-colors tracking-wide'>
        {label}
      </span>
    </button>
  );
}
