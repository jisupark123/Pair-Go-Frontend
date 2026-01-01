import { useParams } from 'react-router';

import { useGame } from '@/hooks/query/useGame';
import { useMe } from '@/hooks/query/useMe';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { DesktopGameLayout } from '@/pages/rooms/roomId/game/components/desktop/DesktopGameLayout';
import { MobileGameLayout } from '@/pages/rooms/roomId/game/components/mobile/MobileGameLayout';

const DESKTOP_WIDTH_BP = 900; // 950px 이상이면 desktop

export default function Game() {
  const { roomId } = useParams();
  const { data: me } = useMe();
  const { data: game, isLoading } = useGame(roomId);

  const isDesktop = useMediaQuery(`(min-width: ${DESKTOP_WIDTH_BP}px)`);

  if (isLoading || !game) {
    return <div className='flex items-center justify-center min-h-screen text-hextech-blue-300'>Loading Game...</div>;
  }

  const myTeamIndex = game.teams[0].players.find((p) => p.data.id === me?.id) ? 0 : 1;
  const myTeam = game.teams[myTeamIndex];
  const opponentTeam = game.teams[myTeamIndex === 0 ? 1 : 0];

  // --- Layout Selection ---
  if (isDesktop) {
    return (
      <DesktopGameLayout
        game={game}
        myTeam={myTeam}
        opponentTeam={opponentTeam}
        currentTurnPlayer={game.currentTurnPlayer}
      />
    );
  }

  return (
    <MobileGameLayout
      game={game}
      myTeam={myTeam}
      opponentTeam={opponentTeam}
      currentTurnPlayer={game.currentTurnPlayer}
    />
  );
}
