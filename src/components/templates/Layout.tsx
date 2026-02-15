import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <main className='relative flex min-h-screen w-full flex-1 flex-col'>
        <Outlet />
      </main>
    </div>
  );
}
