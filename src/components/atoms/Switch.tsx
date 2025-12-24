import clsx from 'clsx';

const sizeMap = {
  sm: { width: 3.2, height: 2, knob: 1.6 },
  md: { width: 4, height: 2.4, knob: 2 },
  lg: { width: 5.2, height: 3.1, knob: 2.6 },
};

export default function Switch({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  activeColor = 'var(--color-primary',
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  activeColor?: string; // Tailwind CSS 색상 클래스 (예: 'green-500', 'blue-500' 등)
}) {
  const { width, height, knob } = sizeMap[size];
  const INACTIVATE_COLOR = '#D1D5DC'; // 스위치 OFF 색상 (회색)

  return (
    <button
      type='button'
      role='switch'
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={clsx(
        `relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none`,
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        // 'bg-gray-300',
      )}
      style={{
        width: `${width}rem`,
        height: `${height}rem`,
        backgroundColor: checked ? activeColor : INACTIVATE_COLOR,
      }}
    >
      <span
        className={`
          inline-block bg-white rounded-full shadow-md transform transition-transform duration-200
        `}
        style={{
          width: `${knob}rem`,
          height: `${knob}rem`,
          transform: checked ? `translateX(${width - knob - 0.25}rem)` : `translateX(0.25rem)`,
        }}
      />
    </button>
  );
}
