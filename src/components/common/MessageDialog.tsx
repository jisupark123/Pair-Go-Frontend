import { Button } from '@/components/figma/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/figma/dialog';
import { MESSAGES } from '@/constants/messages';

interface MessageDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: React.ReactNode;
  onConfirm?: () => void;
  confirmLabel?: string;
  blocking?: boolean;
}

export function MessageDialog({
  open,
  onOpenChange,
  title = MESSAGES.LOGIN_REQUIRED.TITLE,
  description = MESSAGES.LOGIN_REQUIRED.DESCRIPTION,
  onConfirm,
  confirmLabel = '확인',
  blocking = false,
}: MessageDialogProps) {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onOpenChange?.(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        // If blocking is true, we ONLY allow closing if it's NOT a user interaction
        // like clicking outside or pressing escape.
        // However, onOpenChange captures all close attempts.
        // For 'blocking' UI in Radix, we typically handle interaction prevention in Content.
        // But if isOpen is false, it means a close was requested.
        if (!isOpen) {
          if (!blocking) {
            onOpenChange?.(false);
          }
          // If blocking is true, we DO NOTHING here, unless the close came from our button.
          // But our button calls handleConfirm -> onOpenChange(false) explicitly?
          // No, our button calls onConfirm.
          // If onConfirm is passed, it manages what happens.
          // If we just rely on onOpenChange, we need to know source.
          // Actually, simpler: prevent interactions in DialogContent if blocking.
          onOpenChange?.(false);
        }
      }}
    >
      <DialogContent
        className='border border-hextech-purple-500/30 bg-slate-900 p-6 shadow-2xl sm:max-w-sm'
        onInteractOutside={(e) => {
          if (blocking) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          if (blocking) {
            e.preventDefault();
          }
        }}
      >
        <div className='flex flex-col items-center gap-4 text-center'>
          {/* Simple Icon */}
          <div className='mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-hextech-purple-500/10'>
            <svg
              className='h-6 w-6 text-hextech-purple-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
              />
            </svg>
          </div>

          <div className='space-y-1'>
            <DialogTitle className='text-xl font-bold text-hextech-purple-100'>{title}</DialogTitle>
            <DialogDescription className='text-sm whitespace-pre-wrap text-hextech-purple-200/60'>
              {description}
            </DialogDescription>
          </div>

          <DialogFooter className='mt-2 w-full'>
            <Button
              onClick={handleConfirm}
              className='w-full bg-hextech-purple-600 font-medium text-white shadow-lg shadow-hextech-purple-900/20 hover:bg-hextech-purple-500'
            >
              {confirmLabel}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
