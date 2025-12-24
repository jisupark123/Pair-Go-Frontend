import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <div className='w-full min-h-screen flex flex-col'>
      <main className='w-full min-h-screen px-6 pb-6 md:pb-16 flex-1 flex flex-col relative'>
        <Outlet />
      </main>
    </div>
  );
}
