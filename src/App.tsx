import { Route, Routes } from 'react-router';

import Layout from '@/components/templates/Layout';
import Home from '@/pages/home/Home';
import Login from '@/pages/login/Login';
import Game from '@/pages/rooms/roomId/Game';
import Room from '@/pages/rooms/roomId/Room';
import ProfileSettings from '@/pages/settings/ProfileSettings';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/rooms/:roomId' element={<Room />} />
        <Route path='/rooms/:roomId/game' element={<Game />} />
        <Route path='/settings/profile' element={<ProfileSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
