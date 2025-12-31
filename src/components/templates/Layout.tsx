import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <div className='w-full min-h-screen flex flex-col'>
      <main className='w-full min-h-screen flex-1 flex flex-col relative'>
        <Outlet />
      </main>
    </div>
  );
}
