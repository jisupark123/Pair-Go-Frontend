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
      className={`p-2 rounded-lg hover:bg-slate-800/50 transition-colors flex items-center gap-2 ${className}`}
      aria-label='뒤로 가기'
      onClick={handleBack}
    >
      <ChevronLeft className={`${iconSize} text-slate-300`} />
      <span className='text-slate-300'>{label}</span>
    </button>
  );
}
