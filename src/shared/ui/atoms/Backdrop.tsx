import { createPortal } from 'react-dom';

export default function Backdrop({
  isOpen,
  onClick,
  children,
}: {
  isOpen: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;
  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60' onClick={onClick}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.body,
  );
}
