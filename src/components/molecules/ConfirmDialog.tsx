import type { ReactNode } from 'react';

import { Button } from '@/components/figma/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/figma/dialog';

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
      <DialogContent className='bg-hextech-silver-900 border-hextech-purple-500/50 text-hextech-purple-100 sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-hextech-purple-400'>{title}</DialogTitle>
          <DialogDescription className='text-hextech-purple-300/70'>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className='flex gap-2 w-full justify-end'>
            <DialogClose asChild>
              <Button
                variant='ghost'
                className='text-hextech-purple-400 hover:text-hextech-purple-200 hover:bg-hextech-purple-900/20'
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
                  ? 'bg-hextech-red-600 hover:bg-hextech-red-700 text-white border-none'
                  : 'bg-hextech-purple-600 hover:bg-hextech-purple-700 text-white border-none'
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
