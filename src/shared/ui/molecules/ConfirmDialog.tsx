import type { ReactNode } from 'react';

import { Button } from '@/shared/ui/figma/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/figma/dialog';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: ReactNode;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
  variant?: 'default' | 'destructive';
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  cancelText = '취소',
  confirmText = '확인',
  onConfirm,
  variant = 'default',
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='border-hextech-purple-500/50 bg-hextech-silver-900 text-hextech-purple-100 sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-hextech-purple-400'>{title}</DialogTitle>
          <DialogDescription className='text-hextech-purple-300/70'>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className='flex w-full justify-end gap-2'>
            <DialogClose asChild>
              <Button
                variant='ghost'
                className='text-hextech-purple-400 hover:bg-hextech-purple-900/20 hover:text-hextech-purple-200'
              >
                {cancelText}
              </Button>
            </DialogClose>
            <Button
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
              className={
                variant === 'destructive'
                  ? 'border-none bg-hextech-red-600 text-white hover:bg-hextech-red-700'
                  : 'border-none bg-hextech-purple-600 text-white hover:bg-hextech-purple-700'
              }
            >
              {confirmText}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
