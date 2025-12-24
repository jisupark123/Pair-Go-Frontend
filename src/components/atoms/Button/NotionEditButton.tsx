import type { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export default function NotionEditButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx('flex justify-center items-center flex-wrap w-3.5 p-0.5 gap-0.5', props.className)}
    >
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className='w-1 h-1 bg-light-gray rounded-full' />
      ))}
    </button>
  );
}
