import type { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export default function MinusButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx('flex justify-center items-center p-1.25 rounded-full border border-danger', props.className)}
    >
      <div className='w-2.5 h-0.5 bg-danger' />
    </button>
  );
}
