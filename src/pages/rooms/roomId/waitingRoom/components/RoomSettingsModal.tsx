import { useEffect } from 'react';
import { useImmer } from 'use-immer';

import { getSocket } from '@/lib/socket';

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
import { RoomSettingsForm } from '@/components/organisms/RoomSettingsForm';
import type { Room } from '@/types/room';

interface RoomSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomId: string;
  currentSettings: Room['settings'];
}

export function RoomSettingsModal({ open, onOpenChange, roomId, currentSettings }: RoomSettingsModalProps) {
  const [settings, updateSettings] = useImmer<Room['settings']>(currentSettings);

  // Sync settings when modal opens
  useEffect(() => {
    if (open) {
      updateSettings(currentSettings);
    }
  }, [open, currentSettings, updateSettings]);

  const handleSave = () => {
    const socket = getSocket('');
    socket.emit('updateRoomSettings', { roomId, settings });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px] bg-hextech-silver-950 border-hextech-blue-800 text-hextech-silver-100 p-0 overflow-hidden gap-0'>
        <DialogHeader className='p-6 pb-2'>
          <DialogTitle className='text-2xl text-center font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-hextech-blue-100 to-hextech-blue-500'>
            대국 설정 변경
          </DialogTitle>
          <DialogDescription className='text-center text-hextech-blue-400/60'>
            변경할 대국 규칙과 시간 설정을 선택해주세요
          </DialogDescription>
        </DialogHeader>

        <RoomSettingsForm settings={settings} updateSettings={updateSettings} />

        <DialogFooter className='p-6 pt-2 bg-hextech-silver-950'>
          <div className='flex gap-2 w-full justify-end'>
            <DialogClose asChild>
              <Button
                variant='ghost'
                className='text-hextech-blue-400 hover:text-hextech-blue-200 hover:bg-hextech-blue-900/20'
              >
                취소
              </Button>
            </DialogClose>
            <Button
              onClick={handleSave}
              className='bg-hextech-blue-600 hover:bg-hextech-blue-700 text-white border-none'
            >
              저장하기
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
