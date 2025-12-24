import type { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export default function DeleteButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx('flex justify-center items-center w-6 h-6 rounded-full bg-danger', props.className)}
    >
      <div className='w-3 h-0.5 bg-white rounded-full' />
    </button>
  );
}
