import { useImmer } from 'use-immer';

import { Button } from '@/components/figma/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/figma/dialog';
import { RoomSettingsForm } from '@/components/organisms/RoomSettingsForm';
import { useCreateRoom } from '@/hooks/query/useCreateRoom';
import type { RoomSettings } from '@/types/roomSettings';

export default function CreateRoomModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [settings, updateSettings] = useImmer<RoomSettings>({
    handicap: '0', // handicap이 0인 경우 호선
    komi: '0', // 호선인 경우 komi는 0으로 설정
    stoneColor: 'auto',
    basicTime: '10',
    countdownTime: '30',
    countdownCount: '3',
  });

  const { mutate: createRoom, isPending } = useCreateRoom();

  const handleCreateRoom = () => {
    createRoom(settings, {
      onSuccess: () => {
        onOpenChange(false);
      },
      onError: (error) => {
        console.error('Failed to create room:', error);
        // Toast is handled? or we can add here
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px] bg-hextech-silver-950 border-hextech-blue-800 text-hextech-silver-100 p-0 overflow-hidden gap-0'>
        <DialogHeader className='p-6 pb-2'>
          <DialogTitle className='text-2xl text-center font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-hextech-blue-100 to-hextech-blue-500'>
            방 만들기
          </DialogTitle>
          <DialogDescription className='text-center text-hextech-blue-400/60'>
            대국 규칙과 시간 설정을 선택해주세요
          </DialogDescription>
        </DialogHeader>

        <RoomSettingsForm settings={settings} updateSettings={updateSettings} disabled={isPending} />

        <div className='p-6 pt-2'>
          <Button
            className='group relative w-full h-14 text-lg font-bold tracking-widest
              bg-hextech-silver-900 border-2 border-hextech-blue-600 text-hextech-blue-100
              hover:bg-hextech-silver-800 hover:border-hextech-blue-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]
              active:scale-[0.98]
              transition-all duration-300 overflow-hidden'
            onClick={handleCreateRoom}
            disabled={isPending}
          >
            <div className='absolute inset-0 bg-linear-to-r from-hextech-blue-600/10 via-hextech-blue-500/10 to-hextech-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            <div className='absolute inset-0 bg-linear-to-b from-transparent via-hextech-blue-400/5 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500' />
            <span className='relative z-10 flex items-center justify-center gap-3'>
              <span className='w-1.5 h-1.5 bg-hextech-blue-500 rotate-45 group-hover:bg-hextech-blue-300 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-300' />
              방 만들기
              <span className='w-1.5 h-1.5 bg-hextech-blue-500 rotate-45 group-hover:bg-hextech-blue-300 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-300' />
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
