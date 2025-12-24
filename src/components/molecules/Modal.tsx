import type { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';

import Backdrop from '@/components/atoms/Backdrop';

export default function Modal({
  isOpen,
  onClose,
  closeOnBackdropClick = true,
  ...props
}: {
  isOpen: boolean;
  onClose: () => void;
  closeOnBackdropClick?: boolean; // Backdrop 클릭 시 모달 닫기 여부
} & HTMLAttributes<HTMLDivElement>) {
  if (!isOpen) return null;
  return createPortal(
    <Backdrop isOpen={isOpen} {...(closeOnBackdropClick ? { onClick: onClose } : {})}>
      <div className={clsx('bg-bg', props.className)}>{props.children}</div>
    </Backdrop>,
    document.body,
  );
}
