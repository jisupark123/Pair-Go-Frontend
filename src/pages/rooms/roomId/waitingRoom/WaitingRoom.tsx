import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  Ban,
  Copy,
  Crown,
  Monitor,
  Pause,
  Play,
  RefreshCw,
  Settings,
  Smartphone,
  Tablet,
  Timer,
  User,
  Users,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

import { useMe } from '@/features/auth/hooks/useMe';
import { useRoom } from '@/features/rooms/hooks/useRoom';
import type { Player, Room, Team } from '@/features/rooms/room.type';
import { RoomSettingsModal } from '@/pages/rooms/roomId/waitingRoom/components/RoomSettingsModal';
import { getSocket } from '@/shared/api/socket';
import { ThemeBox } from '@/shared/ui/atoms/ThemeBox';
import { Button } from '@/shared/ui/figma/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/figma/tooltip';
import { cn } from '@/shared/ui/figma/utils';
import { ConfirmDialog } from '@/shared/ui/molecules/ConfirmDialog';

const MAX_PLAYERS = 4; // Pair Go usually 4 players

export default function WaitingRoom() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { roomId } = useParams();
  const { data: me } = useMe();
  const { data: room, isLoading: isRoomLoading } = useRoom(roomId);
  const [kickTargetId, setKickTargetId] = useState<number | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // gameStart 이벤트 리스너 (대기실에서만 필요)
  useEffect(() => {
    if (!roomId) return;

    const socket = getSocket('');

    socket.on('gameStart', (updatedRoom: Room) => {
      queryClient.setQueryData(['room', roomId], updatedRoom);
      navigate(`/rooms/${roomId}/game`, { replace: true });
    });

    return () => {
      socket.off('gameStart');
    };
  }, [roomId, queryClient, navigate]);

  // Derived State from Room Data
  const players = room?.players || [];

  const myPlayer = players.find((p) => p.id === me?.id);
  const isMyReady = myPlayer?.isReady || false;
  const isHost = myPlayer?.isHost ?? false;

  const teamRed = players.filter((p) => p.team === 'red');
  const teamBlue = players.filter((p) => p.team === 'blue');

  const otherPlayersReady = players.every((p) => p.isHost || p.isReady);
  const isTeamsBalanced = teamRed.length === 2 && teamBlue.length === 2;
  const canStart = isTeamsBalanced && otherPlayersReady;

  if (isRoomLoading || !room || !me) {
    return (
      <div className='flex min-h-screen items-center justify-center text-hextech-blue-300'>
        <p>방 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  const handleStartGame = () => {
    if (canStart) {
      const socket = getSocket('');
      socket.emit('startGame', { roomId });
    }
  };

  const handleToggleReady = () => {
    if (!roomId) return;
    const socket = getSocket('');
    socket.emit('updateReadyStatus', { roomId, isReady: !isMyReady });
  };

  const handleChangeTeam = () => {
    if (!me) return;
    const socket = getSocket('');
    socket.emit('changeTeam', { roomId, targetUserId: me.id });
  };

  const handleChangePlayerTeam = (playerId: number) => {
    const socket = getSocket('');
    socket.emit('changeTeam', { roomId, targetUserId: playerId });
  };

  const handleKickPlayer = (playerId: number) => {
    setKickTargetId(playerId);
  };

  const handleConfirmKick = () => {
    if (!roomId || !kickTargetId) return;

    const socket = getSocket('');
    socket.emit('kickPlayer', { roomId, targetId: kickTargetId });
    setKickTargetId(null);
  };

  const handleCopyInviteLink = () => {
    const inviteLink = window.location.href; // Or standard invite link format
    navigator.clipboard.writeText(inviteLink);
    toast.success('초대 링크가 복사되었습니다!');
  };

  return (
    <div className='flex flex-1 flex-col pt-2'>
      {/* <Navigation
        left={<NavigationBack label='나가기' onClick={() => navigate('/', { replace: true })} />}
        title='대기실'
      /> */}
      <div className='mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-6 pt-5 duration-700 animate-in fade-in'>
        {/* 1. Header & Settings */}
        <header className='flex flex-col items-center justify-between gap-4 md:flex-row'>
          <div className='flex items-center gap-3'>
            <ThemeBox
              color='silver'
              size='sm'
              filled
              className='flex items-center justify-center rounded-full border-hextech-silver-600 px-4 py-3'
            >
              <span className='text-xl font-extrabold tracking-tighter text-hextech-silver-300'>2 vs 2</span>
            </ThemeBox>
            <div>
              <h1 className='text-2xl font-bold tracking-tight text-hextech-blue-100'>페어 바둑</h1>
              <div className='mt-1 flex items-center gap-3'>
                <p className='text-sm text-hextech-blue-400/60'>Room #{roomId?.slice(0, 8)}</p>
                <div className='h-3 w-px bg-hextech-blue-900' />
                <button
                  onClick={handleCopyInviteLink}
                  className='flex cursor-pointer items-center gap-1.5 rounded-md border border-hextech-blue-700/50 bg-hextech-blue-900/40 px-2 py-0.5 text-[11px] text-hextech-blue-300 transition-all hover:border-hextech-blue-500 hover:bg-hextech-blue-800/60'
                >
                  <Copy className='h-3 w-3' />
                  초대 링크 복사
                </button>
              </div>
            </div>
          </div>

          {/* Settings Badge */}
          <ThemeBox
            color='silver'
            filled
            size='sm'
            className={cn(
              'flex gap-6 border-hextech-silver-700/50 px-6 py-3',
              isHost && 'cursor-pointer transition-colors hover:bg-hextech-silver-800',
            )}
            onClick={isHost ? () => setIsSettingsOpen(true) : undefined}
          >
            <div className='flex items-center gap-2'>
              <Settings className='h-4 w-4 text-hextech-gold-400' />
              <span className='text-sm font-medium text-hextech-silver-300'>
                {room.settings.handicap === '0'
                  ? '호선'
                  : room.settings.handicap === '1'
                    ? '정선'
                    : `${room.settings.handicap}점 접바둑`}{' '}
                /{' '}
                {room.settings.handicap === '0'
                  ? '백 덤 + 6.5집'
                  : room.settings.komi === '0'
                    ? '덤 없음'
                    : `흑 덤 + ${room.settings.komi}집`}
              </span>
            </div>
            <div className='h-4 w-px bg-hextech-silver-700' />
            <div className='flex items-center gap-2'>
              <Timer className='h-4 w-4 text-hextech-gold-400' />
              <span className='text-sm font-medium text-hextech-silver-300'>
                {room.settings.basicTime === '0' ? '없음' : `${room.settings.basicTime}분`} +{' '}
                {room.settings.byoyomiTime === '0'
                  ? '없음'
                  : `${room.settings.byoyomiTime}초 ${room.settings.byoyomiPeriods}회`}
              </span>
            </div>
          </ThemeBox>
        </header>

        {/* 2. Main Content - Team Lists */}
        <main className='relative grid flex-1 grid-cols-1 items-start gap-4 py-8 md:grid-cols-2 md:gap-8'>
          {/* Team A (Blue) */}
          {/* Team A (Blue) */}
          <TeamSection
            team='blue'
            players={teamBlue}
            currentUserId={me.id}
            maxPlayers={MAX_PLAYERS / 2} // 2 per team
            amIHost={isHost}
            onChangeTeam={handleChangePlayerTeam}
            onKick={handleKickPlayer}
            stoneColorMethod={room.settings.stoneColorMethod}
          />

          {/* Team B (Red) */}
          <TeamSection
            team='red'
            players={teamRed}
            currentUserId={me.id}
            maxPlayers={MAX_PLAYERS / 2}
            amIHost={isHost}
            onChangeTeam={handleChangePlayerTeam}
            onKick={handleKickPlayer}
            stoneColorMethod={room.settings.stoneColorMethod}
          />
        </main>

        {/* 3. Footer Action Bar */}
        <footer className='mt-auto flex flex-col items-center gap-6 pb-8'>
          {/* Controls */}
          <div className='flex w-full max-w-xl items-center justify-center gap-4'>
            {/* Change Team */}
            <Button
              className='group h-14 gap-2 border border-hextech-silver-600 bg-linear-to-b from-hextech-silver-800 to-hextech-silver-900 px-8 text-hextech-silver-300 transition-all duration-300 hover:border-hextech-gold-500 hover:text-hextech-gold-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]'
              onClick={handleChangeTeam}
            >
              <RefreshCw className='h-5 w-5 transition-transform duration-500 group-hover:rotate-180' />
              <span className='hidden font-bold tracking-wider sm:inline'>팀 변경</span>
            </Button>

            {/* Ready / Start Button */}
            <Button
              disabled={isHost && !canStart}
              className={cn(
                'h-16 flex-1 border-2 text-xl font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all duration-300',
                isHost
                  ? canStart
                    ? 'animate-gradient-x border-hextech-purple-400 bg-linear-to-r from-hextech-purple-900 via-hextech-purple-600 to-hextech-purple-900 text-hextech-purple-100 hover:shadow-[0_0_30px_rgba(147,51,234,0.6)]'
                    : 'cursor-not-allowed border-hextech-silver-600 bg-hextech-silver-900 text-hextech-silver-500 opacity-50'
                  : !isMyReady
                    ? 'border-hextech-red-400 bg-hextech-red-900/80 text-hextech-red-100 hover:bg-hextech-red-800 hover:shadow-[0_0_30px_rgba(255,0,0,0.4)]'
                    : 'border-hextech-gold-500 bg-hextech-gold-900/80 text-hextech-gold-400 hover:bg-hextech-gold-800',
              )}
              onClick={isHost ? handleStartGame : handleToggleReady}
            >
              <div className='flex items-center gap-3'>
                {isHost ? (
                  <>
                    <Play className='h-6 w-6 fill-current' />
                    <span>시작하기</span>
                  </>
                ) : !isMyReady ? (
                  <>
                    <Play className='h-6 w-6 fill-current' />
                    <span>준비하기</span>
                  </>
                ) : (
                  <>
                    <Pause className='h-6 w-6 fill-current' />
                    <span>준비 취소</span>
                  </>
                )}
              </div>
            </Button>
          </div>
        </footer>
      </div>

      <ConfirmDialog
        open={kickTargetId !== null}
        onOpenChange={(open) => !open && setKickTargetId(null)}
        title='강제 퇴장'
        description={
          <>
            정말로 이 플레이어를 게임에서 강제 퇴장시키겠습니까?
            <br />
            퇴장된 플레이어는 다시 입장할 수 없습니다.
          </>
        }
        confirmText='추방하기'
        cancelText='취소'
        onConfirm={handleConfirmKick}
        variant='destructive'
      />

      {room && !!roomId && (
        <RoomSettingsModal
          open={isSettingsOpen}
          onOpenChange={setIsSettingsOpen}
          roomId={roomId}
          currentSettings={room.settings}
        />
      )}
    </div>
  );
}

// --- Sub Components ---

function TeamSection({
  team,
  players,
  currentUserId,
  maxPlayers,
  amIHost,
  onChangeTeam,
  onKick,
  stoneColorMethod,
}: {
  team: Team;
  players: (Player & { isHost: boolean })[];
  currentUserId: number;
  maxPlayers: number;
  amIHost: boolean;
  onChangeTeam: (id: number) => void;
  onKick: (id: number) => void;
  stoneColorMethod: 'auto' | 'manual';
}) {
  const isBlue = team === 'blue';

  const teamTitle = isBlue ? '블루 팀' : '레드 팀';

  return (
    <div className='flex w-full flex-col gap-4'>
      {/* Team Header */}
      <div
        className={cn(
          'flex items-center justify-between border-b-2 px-2 pb-2',
          isBlue ? 'border-hextech-blue-900' : 'border-hextech-red-900',
        )}
      >
        <div className='flex items-center gap-3'>
          <h2
            className={cn(
              'text-lg font-bold tracking-wider uppercase',
              isBlue ? 'text-hextech-blue-400' : 'text-hextech-red-400',
            )}
          >
            {teamTitle}
          </h2>
          {stoneColorMethod === 'manual' && (
            <div className='flex items-center gap-1.5 rounded-full border border-hextech-silver-700/50 bg-hextech-silver-900/50 px-2 py-0.5'>
              <div
                className={cn(
                  'h-3 w-3 rounded-full shadow-sm',
                  isBlue
                    ? 'border border-hextech-silver-600 bg-hextech-silver-900'
                    : 'border border-hextech-silver-400 bg-hextech-silver-100',
                )}
              />
              <span className='text-xs font-medium text-hextech-silver-400'>{isBlue ? '흑 팀' : '백 팀'}</span>
            </div>
          )}
        </div>
        <div className='flex items-center gap-1.5 text-xs font-medium text-hextech-silver-500'>
          <Users className='h-4 w-4' />
          {players.length} / {maxPlayers}
        </div>
      </div>

      {/* Players Grid */}
      <div className='flex flex-col gap-3'>
        {/* Render filled slots */}
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            isMe={player.id === currentUserId}
            teamColor={isBlue ? 'blue' : 'red'}
            amIHost={amIHost}
            onChangeTeam={() => onChangeTeam(player.id)}
            onKick={() => onKick(player.id)}
          />
        ))}

        {/* Render empty slots */}
        {Array.from({ length: Math.max(0, maxPlayers - players.length) }).map((_, i) => (
          <EmptySlot key={`empty-${i}`} teamColor={isBlue ? 'blue' : 'red'} />
        ))}
      </div>
    </div>
  );
}

function PlayerCard({
  player,
  isMe,
  teamColor,
  amIHost,
  onChangeTeam,
  onKick,
}: {
  player: Player & { isHost: boolean };
  isMe: boolean;
  teamColor: 'blue' | 'red';
  amIHost: boolean;
  onChangeTeam: () => void;
  onKick: () => void;
}) {
  const isBlue = teamColor === 'blue';

  return (
    <ThemeBox
      color={teamColor}
      filled={false} // Highlight 'me' with filled background
      className={cn(
        'relative flex items-center gap-4 overflow-hidden p-3 pr-6 transition-all duration-300',
        // Ready state pulsing effect
        player.isReady && (isBlue ? 'shadow-[inset_0_0_20px_#06b6d4]' : 'shadow-[inset_0_0_20px_#f43f5e]'),
      )}
    >
      {/* Ready Status Stripe */}
      {player.isReady && (
        <div
          className={cn(
            'absolute top-0 bottom-0 left-0 w-1',
            isBlue ? 'bg-hextech-blue-400 shadow-[0_0_10px_#22d3ee]' : 'bg-hextech-red-400 shadow-[0_0_10px_#f43f5e]',
          )}
        />
      )}

      {/* Avatar Circle */}
      <div
        className={cn(
          'relative flex h-12 w-12 items-center justify-center rounded-full border-2 bg-hextech-silver-950',
          isBlue ? 'border-hextech-blue-800' : 'border-hextech-red-800',
        )}
      >
        <User className={cn('h-6 w-6', isBlue ? 'text-hextech-blue-700' : 'text-hextech-red-700')} />

        {/* Host Badge */}
        {player.isHost && (
          <div className='absolute -top-2 -right-2 rounded-full border border-hextech-gold-300 bg-hextech-gold-500 p-1 shadow-sm'>
            <Crown className='h-2.5 w-2.5 fill-current text-hextech-gold-950' />
          </div>
        )}
      </div>

      {/* Info */}
      <div className='min-w-0 flex-1'>
        <div className='flex items-center gap-2'>
          <span
            className={cn(
              'truncate font-bold text-hextech-silver-400 transition-all duration-300',
              player.isReady &&
                (isBlue
                  ? 'text-hextech-blue-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]'
                  : 'text-hextech-red-300 drop-shadow-[0_0_5px_rgba(244,63,94,0.8)]'),
            )}
          >
            {player.nickname}
          </span>
          {isMe && (
            <span
              className={cn(
                'rounded-sm px-1.5 py-0.5 text-[10px] font-bold tracking-wider',
                isBlue ? 'bg-hextech-blue-900 text-hextech-blue-300' : 'bg-hextech-red-900 text-hextech-red-300',
              )}
            >
              ME
            </span>
          )}
          {/* Host Controls */}
          {amIHost && !isMe && (
            <div className='flex items-center gap-1'>
              <ActionButton
                icon={RefreshCw}
                onClick={onChangeTeam}
                label='팀 변경'
                colorClass={isBlue ? 'text-hextech-blue-300' : 'text-hextech-red-300'}
              />
              <ActionButton
                icon={Ban}
                onClick={onKick}
                label='강제 퇴장'
                colorClass={isBlue ? 'text-hextech-blue-300' : 'text-hextech-red-300'}
              />
            </div>
          )}
        </div>
        <div className='text-xs font-medium text-hextech-silver-500'>{player.isReady ? '준비 완료' : '대기 중...'}</div>
      </div>

      {/* Device Type Icon */}
      <div className={cn('rounded-full p-2', isBlue ? 'bg-hextech-blue-500/10' : 'bg-hextech-red-500/10')}>
        {player.deviceType === 'mobile' && (
          <Smartphone className={cn('h-5 w-5', isBlue ? 'text-hextech-blue-400' : 'text-hextech-red-400')} />
        )}
        {player.deviceType === 'tablet' && (
          <Tablet className={cn('h-5 w-5', isBlue ? 'text-hextech-blue-400' : 'text-hextech-red-400')} />
        )}
        {player.deviceType === 'desktop' && (
          <Monitor className={cn('h-5 w-5', isBlue ? 'text-hextech-blue-400' : 'text-hextech-red-400')} />
        )}
      </div>
    </ThemeBox>
  );
}

function EmptySlot({ teamColor }: { teamColor: 'blue' | 'red' }) {
  const isBlue = teamColor === 'blue';
  return (
    <div
      className={cn(
        'flex h-[74px] items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors',
        isBlue
          ? 'border-hextech-blue-900/30 bg-hextech-blue-900/5 text-hextech-blue-900/50'
          : 'border-hextech-red-900/30 bg-hextech-red-900/5 text-hextech-red-900/50',
      )}
    >
      <span className='text-sm font-medium tracking-widest uppercase'>Empty Slot</span>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  onClick,
  label,
  colorClass,
}: {
  icon: React.ElementType;
  onClick: () => void;
  label: string;
  colorClass: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = () => {
    timerRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setTimeout(() => setIsOpen(false), 2000);
  };

  return (
    <Tooltip open={isOpen} onOpenChange={setIsOpen}>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onContextMenu={(e) => e.preventDefault()} // 기본 우클릭 동작 방지
          className={cn('rounded p-2 transition-colors hover:bg-white/10', colorClass)}
        >
          <Icon className='h-5 w-5' />
        </button>
      </TooltipTrigger>
      <TooltipContent className='border-hextech-gold-500 bg-hextech-silver-900 text-hextech-gold-100'>
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
