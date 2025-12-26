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

import { connectSocket, disconnectSocket } from '@/lib/socket';

import { ThemeBox } from '@/components/atoms/ThemeBox';
import { Button } from '@/components/figma/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/figma/tooltip';
import { cn } from '@/components/figma/utils';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { NavigationBack } from '@/components/organisms/Navigation/NavigationBack';
import { useMe } from '@/hooks/query/useMe';
import { useRoom } from '@/hooks/query/useRoom';
import type { Player, Room, Team } from '@/types/room';

const MAX_PLAYERS = 4; // Pair Go usually 4 players

export default function Room() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const queryClient = useQueryClient();
  const { data: me } = useMe();
  const { data: room, isLoading: isRoomLoading } = useRoom(roomId);

  console.log(room);

  useEffect(() => {
    if (!roomId) return;

    // Connect socket on mount/roomId change
    const socket = connectSocket('/rooms');

    const handleJoinRoom = () => {
      console.log('Joining room:', roomId);
      socket.emit('joinRoom', { roomId });
    };

    socket.on('connect', handleJoinRoom);

    // If already connected (e.g. from previous page or fast connection), join immediately
    if (socket.connected) {
      handleJoinRoom();
    }

    socket.on('roomUpdate', (updatedRoom: Room) => {
      // Update React Query Cache instead of local state
      queryClient.setQueryData(['room', roomId], updatedRoom);
    });

    // Cleanup on unmount
    return () => {
      socket.off('connect', handleJoinRoom);
      socket.off('roomUpdate');
      disconnectSocket('/rooms');
    };
  }, [roomId, queryClient]);

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
      <div className='flex items-center justify-center min-h-screen text-hextech-blue-300'>
        <p>방 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  const handleStartGame = () => {
    if (canStart) {
      console.log('Game Starting!');
      // Emit 'startGame' event
    }
  };

  const handleToggleReady = () => {
    // setPlayers((prev) => prev.map((p) => (p.id === myId ? { ...p, isReady: !p.isReady } : p)));
    console.log('Toggle Ready');
    // socket.emit('toggleReady');
  };

  const handleChangeTeam = () => {
    // setPlayers((prev) => prev.map((p) => (p.id === myId ? { ...p, team: p.team === 'blue' ? 'red' : 'blue' } : p)));
    console.log('Change Team');
  };

  const handleChangePlayerTeam = (playerId: number) => {
    // setPlayers((prev) => prev.map((p) => (p.id === playerId ? { ...p, team: p.team === 'blue' ? 'red' : 'blue' } : p)));
    console.log('Change Player Team', playerId);
  };

  const handleKickPlayer = (playerId: number) => {
    console.log('Kick player:', playerId);
  };

  const handleCopyInviteLink = () => {
    const inviteLink = window.location.href; // Or standard invite link format
    navigator.clipboard.writeText(inviteLink);
    toast.success('초대 링크가 복사되었습니다!');
  };

  return (
    <div className='flex-1 pt-[80px] flex flex-col'>
      <Navigation
        left={<NavigationBack label='나가기' onClick={() => navigate('/', { replace: true })} />}
        title={`Room #${room.title || roomId?.slice(0, 8)}`}
      />
      <div className='flex-1 flex flex-col gap-6 max-w-7xl w-full mx-auto pt-5 animate-in fade-in duration-700'>
        {/* 1. Header & Settings */}
        <header className='flex flex-col md:flex-row items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <ThemeBox
              color='silver'
              size='sm'
              filled
              className='px-4 py-3 rounded-full border-hextech-silver-600 flex items-center justify-center'
            >
              <span className='text-xl font-extrabold text-hextech-silver-300 tracking-tighter'>2 vs 2</span>
            </ThemeBox>
            <div>
              <h1 className='text-2xl font-bold text-hextech-blue-100 tracking-tight'>페어 바둑</h1>
              <div className='flex items-center gap-3 mt-1'>
                <p className='text-hextech-blue-400/60 text-sm'>Room #{room.title || roomId?.slice(0, 8)}</p>
                <div className='w-px h-3 bg-hextech-blue-900' />
                <button
                  onClick={handleCopyInviteLink}
                  className='flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-hextech-blue-900/40 border border-hextech-blue-700/50 hover:bg-hextech-blue-800/60 hover:border-hextech-blue-500 text-[11px] text-hextech-blue-300 transition-all cursor-pointer'
                >
                  <Copy className='w-3 h-3' />
                  초대 링크 복사
                </button>
              </div>
            </div>
          </div>

          {/* Settings Badge */}
          <ThemeBox color='silver' filled size='sm' className='flex gap-6 px-6 py-3 border-hextech-silver-700/50'>
            <div className='flex items-center gap-2'>
              <Settings className='w-4 h-4 text-hextech-gold-400' />
              <span className='text-hextech-silver-300 text-sm font-medium'>
                {room.settings.handicap === '0' ? '호선' : `${room.settings.handicap}점 접바둑`} /{' '}
                {room.settings.komi === '0' ? '없음' : `${room.settings.komi}집`}
              </span>
            </div>
            <div className='w-px h-4 bg-hextech-silver-700' />
            <div className='flex items-center gap-2'>
              <Timer className='w-4 h-4 text-hextech-gold-400' />
              <span className='text-hextech-silver-300 text-sm font-medium'>
                {room.settings.basicTime === '0' ? '없음' : `${room.settings.basicTime}분`} +{' '}
                {room.settings.countdownTime === '0'
                  ? '없음'
                  : `${room.settings.countdownTime}초 ${room.settings.countdownCount}회`}
              </span>
            </div>
          </ThemeBox>
        </header>

        {/* 2. Main Content - Team Lists */}
        <main className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start py-8 relative'>
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
          />
        </main>

        {/* 3. Footer Action Bar */}
        <footer className='mt-auto flex flex-col items-center gap-6 pb-6'>
          {/* Controls */}
          <div className='flex items-center gap-4 w-full justify-center max-w-xl'>
            {/* Change Team */}
            <Button
              className='h-14 px-8 gap-2 bg-linear-to-b from-hextech-silver-800 to-hextech-silver-900 border border-hextech-silver-600 hover:border-hextech-gold-500 hover:text-hextech-gold-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] text-hextech-silver-300 transition-all duration-300 group'
              onClick={handleChangeTeam}
            >
              <RefreshCw className='w-5 h-5 group-hover:rotate-180 transition-transform duration-500' />
              <span className='hidden sm:inline font-bold tracking-wider'>팀 변경</span>
            </Button>

            {/* Ready / Start Button */}
            <Button
              disabled={isHost && !canStart}
              className={cn(
                'flex-1 h-16 text-xl font-bold tracking-widest uppercase transition-all duration-300 border-2 shadow-[0_0_20px_rgba(0,0,0,0.3)]',
                isHost
                  ? canStart
                    ? 'bg-linear-to-r from-hextech-purple-900 via-hextech-purple-600 to-hextech-purple-900 animate-gradient-x border-hextech-purple-400 text-hextech-purple-100 hover:shadow-[0_0_30px_rgba(147,51,234,0.6)]'
                    : 'bg-hextech-silver-900 border-hextech-silver-600 text-hextech-silver-500 cursor-not-allowed opacity-50'
                  : !isMyReady
                    ? 'bg-hextech-blue-900/80 border-hextech-blue-400 text-hextech-blue-100 hover:bg-hextech-blue-800 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]'
                    : 'bg-hextech-silver-900 border-hextech-red-500 text-hextech-red-400 hover:bg-hextech-silver-800',
              )}
              onClick={isHost ? handleStartGame : handleToggleReady}
            >
              <div className='flex items-center gap-3'>
                {isHost ? (
                  <>
                    <Play className='w-6 h-6 fill-current' />
                    <span>시작하기</span>
                  </>
                ) : !isMyReady ? (
                  <>
                    <Play className='w-6 h-6 fill-current' />
                    <span>준비 완료</span>
                  </>
                ) : (
                  <>
                    <Pause className='w-6 h-6 fill-current' />
                    <span>준비 취소</span>
                  </>
                )}
              </div>
            </Button>
          </div>
        </footer>
      </div>
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
}: {
  team: Team;
  players: (Player & { isHost: boolean })[];
  currentUserId: number;
  maxPlayers: number;
  amIHost: boolean;
  onChangeTeam: (id: number) => void;
  onKick: (id: number) => void;
}) {
  const isBlue = team === 'blue';

  const teamTitle = isBlue ? '블루 팀' : '레드 팀';

  return (
    <div className='flex flex-col gap-4 w-full'>
      {/* Team Header */}
      <div
        className={cn(
          'flex items-center justify-between pb-2 border-b-2 px-2',
          isBlue ? 'border-hextech-blue-900' : 'border-hextech-red-900',
        )}
      >
        <h2
          className={cn(
            'text-lg font-bold tracking-wider uppercase',
            isBlue ? 'text-hextech-blue-400' : 'text-hextech-red-400',
          )}
        >
          {teamTitle}
        </h2>
        <div className='flex items-center gap-1.5 text-xs font-medium text-hextech-silver-500'>
          <Users className='w-4 h-4' />
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
        'flex items-center gap-4 p-3 pr-6 relative overflow-hidden transition-all duration-300',
        // Ready state pulsing effect
        player.isReady &&
          `shadow-[inset_0_0_20px_rgba(var(--color-${isBlue ? 'hextech-blue-500' : 'hextech-red-500'}),0.2)]`,
      )}
    >
      {/* Ready Status Stripe */}
      {player.isReady && (
        <div
          className={cn(
            'absolute left-0 top-0 bottom-0 w-1',
            isBlue ? 'bg-hextech-blue-400 shadow-[0_0_10px_#22d3ee]' : 'bg-hextech-red-400 shadow-[0_0_10px_#f43f5e]',
          )}
        />
      )}

      {/* Avatar Circle */}
      <div
        className={cn(
          'relative w-12 h-12 rounded-full border-2 flex items-center justify-center bg-hextech-silver-950',
          isBlue ? 'border-hextech-blue-800' : 'border-hextech-red-800',
        )}
      >
        <User className={cn('w-6 h-6', isBlue ? 'text-hextech-blue-700' : 'text-hextech-red-700')} />

        {/* Host Badge */}
        {player.isHost && (
          <div className='absolute -top-2 -right-2 bg-hextech-gold-500 rounded-full p-1 border border-hextech-gold-300 shadow-sm'>
            <Crown className='w-2.5 h-2.5 text-hextech-gold-950 fill-current' />
          </div>
        )}
      </div>

      {/* Info */}
      <div className='flex-1 min-w-0'>
        <div className='flex items-center gap-2'>
          <span
            className={cn(
              'font-bold truncate transition-all duration-300 text-hextech-silver-400',
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
                'text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider',
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
        <div className='text-xs text-hextech-silver-500 font-medium'>{player.isReady ? '준비 완료' : '대기 중...'}</div>
      </div>

      {/* Device Type Icon */}
      <div className={cn('p-2 rounded-full', isBlue ? 'bg-hextech-blue-500/10' : 'bg-hextech-red-500/10')}>
        {player.deviceType === 'mobile' && (
          <Smartphone className={cn('w-5 h-5', isBlue ? 'text-hextech-blue-400' : 'text-hextech-red-400')} />
        )}
        {player.deviceType === 'tablet' && (
          <Tablet className={cn('w-5 h-5', isBlue ? 'text-hextech-blue-400' : 'text-hextech-red-400')} />
        )}
        {player.deviceType === 'desktop' && (
          <Monitor className={cn('w-5 h-5', isBlue ? 'text-hextech-blue-400' : 'text-hextech-red-400')} />
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
        'h-[74px] border-2 border-dashed rounded-xl flex items-center justify-center gap-2 transition-colors',
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
  const timerRef = useRef<any>(null);

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
          className={cn('p-2 rounded hover:bg-white/10 transition-colors', colorClass)}
        >
          <Icon className='w-5 h-5' />
        </button>
      </TooltipTrigger>
      <TooltipContent className='bg-hextech-silver-900 border-hextech-gold-500 text-hextech-gold-100'>
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
