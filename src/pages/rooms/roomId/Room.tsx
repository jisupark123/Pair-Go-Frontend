import { useRef, useState } from 'react';
import {
  Ban,
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
import { useNavigate } from 'react-router';

import { ThemeBox } from '@/components/atoms/ThemeBox';
import { Button } from '@/components/figma/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/figma/tooltip';
import { cn } from '@/components/figma/utils';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { NavigationBack } from '@/components/organisms/Navigation/NavigationBack';

// Types
type Team = 'A' | 'B';

interface Player {
  id: string;
  nickname: string;
  team: Team;
  isHost: boolean;
  isReady: boolean;
  avatar?: string; // Placeholder for avatar image URL
  device: 'mobile' | 'tablet' | 'desktop';
}

interface RoomSettings {
  handicap: string;
  komi: string;
  basicTime: string;
  countdown: string;
}

// Mock Data
const MOCK_SETTINGS: RoomSettings = {
  handicap: '호선',
  komi: '6.5집',
  basicTime: '10분',
  countdown: '30초 3회',
};

const INITIAL_PLAYERS: Player[] = [
  { id: 'p1', nickname: 'HideOnBush', team: 'A', isHost: true, isReady: true, device: 'desktop' }, // Me
  { id: 'p2', nickname: 'FakerSlayer', team: 'A', isHost: false, isReady: true, device: 'mobile' },
  { id: 'p3', nickname: 'Chovy', team: 'B', isHost: false, isReady: true, device: 'tablet' },
  { id: 'p4', nickname: 'ShowMaker', team: 'B', isHost: false, isReady: true, device: 'desktop' },
];

const MAX_PLAYERS = 2;

export default function Room() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [myId] = useState('p1'); // Assume current user is p1

  const myPlayer = players.find((p) => p.id === myId);
  const isMyReady = myPlayer?.isReady || false;
  const isHost = myPlayer?.isHost ?? false;

  const teamA = players.filter((p) => p.team === 'A');
  const teamB = players.filter((p) => p.team === 'B');

  const otherPlayersReady = players.every((p) => p.isHost || p.isReady);
  const isTeamsBalanced = teamA.length === 2 && teamB.length === 2;
  const canStart = isTeamsBalanced && otherPlayersReady;

  const handleStartGame = () => {
    if (canStart) {
      console.log('Game Starting!');
    }
  };

  const handleToggleReady = () => {
    setPlayers((prev) => prev.map((p) => (p.id === myId ? { ...p, isReady: !p.isReady } : p)));
  };

  const handleChangeTeam = () => {
    setPlayers((prev) => prev.map((p) => (p.id === myId ? { ...p, team: p.team === 'A' ? 'B' : 'A' } : p)));
  };

  const handleChangePlayerTeam = (playerId: string) => {
    setPlayers((prev) => prev.map((p) => (p.id === playerId ? { ...p, team: p.team === 'A' ? 'B' : 'A' } : p)));
  };

  const handleKickPlayer = (playerId: string) => {
    console.log('Kick player:', playerId);
  };

  // Ensure layouts are balanced even if teams are uneven (for UI placeholder slots if needed)
  // For now, flexible mapping.

  return (
    <div className='flex-1 pt-[80px] flex flex-col'>
      <Navigation
        left={<NavigationBack label='나가기' onClick={() => navigate('/', { replace: true })} />}
        title='Room #1394'
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
              <p className='text-hextech-blue-400/60 text-sm'>Room #1394</p>
            </div>
          </div>

          {/* Settings Badge */}
          <ThemeBox color='silver' filled size='sm' className='flex gap-6 px-6 py-3 border-hextech-silver-700/50'>
            <div className='flex items-center gap-2'>
              <Settings className='w-4 h-4 text-hextech-gold-400' />
              <span className='text-hextech-silver-300 text-sm font-medium'>
                {MOCK_SETTINGS.handicap} / {MOCK_SETTINGS.komi}
              </span>
            </div>
            <div className='w-px h-4 bg-hextech-silver-700' />
            <div className='flex items-center gap-2'>
              <Timer className='w-4 h-4 text-hextech-gold-400' />
              <span className='text-hextech-silver-300 text-sm font-medium'>
                {MOCK_SETTINGS.basicTime} + {MOCK_SETTINGS.countdown}
              </span>
            </div>
          </ThemeBox>
        </header>

        {/* 2. Main Content - Team Lists */}
        <main className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start py-8 relative'>
          {/* Team A (Blue) */}
          {/* Team A (Blue) */}
          <TeamSection
            team='A'
            players={teamA}
            currentUserId={myId}
            maxPlayers={MAX_PLAYERS} // Scalable limit
            amIHost={myPlayer?.isHost ?? false}
            onChangeTeam={handleChangePlayerTeam}
            onKick={handleKickPlayer}
          />

          {/* Team B (Red) */}
          <TeamSection
            team='B'
            players={teamB}
            currentUserId={myId}
            maxPlayers={MAX_PLAYERS}
            amIHost={myPlayer?.isHost ?? false}
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
  players: Player[];
  currentUserId: string;
  maxPlayers: number;
  amIHost: boolean;
  onChangeTeam: (id: string) => void;
  onKick: (id: string) => void;
}) {
  const isBlue = team === 'A';

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
  player: Player;
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
        {player.avatar ? (
          <img src={player.avatar} alt={player.nickname} className='w-full h-full rounded-full object-cover' />
        ) : (
          <User className={cn('w-6 h-6', isBlue ? 'text-hextech-blue-700' : 'text-hextech-red-700')} />
        )}

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
        {player.device === 'mobile' && (
          <Smartphone className={cn('w-5 h-5', isBlue ? 'text-hextech-blue-400' : 'text-hextech-red-400')} />
        )}
        {player.device === 'tablet' && (
          <Tablet className={cn('w-5 h-5', isBlue ? 'text-hextech-blue-400' : 'text-hextech-red-400')} />
        )}
        {player.device === 'desktop' && (
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
