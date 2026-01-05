import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { toast } from 'sonner';

import { connectSocket, disconnectSocket } from '@/lib/socket';

import { AuthGuard } from '@/components/auth/AuthGuard';
import Layout from '@/components/templates/Layout';
import { MESSAGES } from '@/constants/messages';
import { useMe } from '@/hooks/query/useMe';
import Home from '@/pages/home/Home';
import Login from '@/pages/login/Login';
import Game from '@/pages/rooms/roomId/game/Game';
import RoomLayout from '@/pages/rooms/roomId/RoomLayout';
import WaitingRoom from '@/pages/rooms/roomId/waitingRoom/WaitingRoom';
import ProfileSettings from '@/pages/settings/ProfileSettings';

function App() {
  const { data: me } = useMe();

  useEffect(() => {
    if (me && sessionStorage.getItem('login_process') === 'true') {
      toast.success(MESSAGES.LOGIN.WELCOME(me.nickname));
      sessionStorage.removeItem('login_process');
    }
  }, [me]);

  useEffect(() => {
    const socket = connectSocket('');
    socket.on('exception', (error: Error) => {
      toast.error(error.message || '오류가 발생했습니다.');
    });
    return () => {
      socket.off('exception');
      disconnectSocket('');
    };
  }, []);

  return (
    <Routes>
      <Route
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/rooms/:roomId' element={<RoomLayout />}>
          <Route index element={<WaitingRoom />} />
          <Route path='game' element={<Game />} />
        </Route>

        <Route path='/settings/profile' element={<ProfileSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
