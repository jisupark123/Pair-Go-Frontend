import type { HTMLAttributes } from 'react';
import clsx from 'clsx';

export default function Chip({
  label,
  fill = false,
  bold = false,
  disabled = false,
  onClick,
  ...props
}: {
  label: string;
  fill?: boolean;
  bold?: boolean;
  disabled?: boolean;
  onClick?: () => void;
} & HTMLAttributes<HTMLDivElement>) {
  const isOnClickable = Boolean(onClick) && !disabled;
  return (
    <div
      className={clsx(
        'flex justify-center items-center px-[12px] py-[4px] rounded-[8px] text-[20px]',
        fill ? 'bg-light-gray' : 'bg-dark-gray',
        bold ? 'font-bold' : 'font-normal',
        disabled ? 'text-dark-text cursor-not-allowed' : 'text-light-text',
        isOnClickable ? 'cursor-pointer hover:bg-light-gray transition-colors duration-200' : 'cursor-text',
        props.className ?? '',
      )}
      onClick={isOnClickable ? onClick : undefined}
    >
      {label}
    </div>
  );
}
