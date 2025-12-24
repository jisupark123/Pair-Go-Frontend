export type SegmentedControlOption<T extends string> = {
  label: string;
  value: T;
};

interface SegmentedControlProps<T extends string> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange?: (value: T) => void;
}

export default function SegmentedControl<T extends string>({ options, value, onChange }: SegmentedControlProps<T>) {
  const handleClick = (value: T) => {
    onChange?.(value);
  };

  return (
    <div className='flex gap-0.5 p-0.5 bg-dark-gray rounded-lg'>
      {options.map(({ label, value: optionValue }) => (
        <button
          key={optionValue}
          onClick={() => handleClick(optionValue)}
          className={`px-3 py-1 rounded-lg label-lg transition-colors duration-200 ${
            value === optionValue ? 'bg-light-gray text-light-text' : ' text-dark-text hover:bg-light-gray'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
