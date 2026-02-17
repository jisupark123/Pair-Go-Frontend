import { useEffect } from 'react';
import { useImmer } from 'use-immer';

import { RoomSettingsForm } from '@/app/rooms/_components/RoomSettingsForm';
import type { Room } from '@/features/rooms/room.type';
import { getSocket } from '@/shared/api/socket';
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
      <DialogContent className='gap-0 overflow-hidden border-hextech-blue-800 bg-hextech-silver-950 p-0 text-hextech-silver-100 sm:max-w-[600px]'>
        <DialogHeader className='p-6 pb-2'>
          <DialogTitle className='bg-linear-to-b from-hextech-blue-100 to-hextech-blue-500 bg-clip-text text-center text-2xl font-bold tracking-tighter text-transparent'>
            대국 설정 변경
          </DialogTitle>
          <DialogDescription className='text-center text-hextech-blue-400/60'>
            변경할 대국 규칙과 시간 설정을 선택해주세요
          </DialogDescription>
        </DialogHeader>

        <RoomSettingsForm settings={settings} updateSettings={updateSettings} />

        <DialogFooter className='bg-hextech-silver-950 p-6 pt-2'>
          <div className='flex w-full justify-end gap-2'>
            <DialogClose asChild>
              <Button
                variant='ghost'
                className='text-hextech-blue-400 hover:bg-hextech-blue-900/20 hover:text-hextech-blue-200'
              >
                취소
              </Button>
            </DialogClose>
            <Button
              onClick={handleSave}
              className='border-none bg-hextech-blue-600 text-white hover:bg-hextech-blue-700'
            >
              저장하기
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
