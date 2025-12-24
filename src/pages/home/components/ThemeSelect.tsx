'use client';

import { createContext, useContext } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/figma/select';
import { cn } from '@/components/figma/utils';
import type { ThemeColor } from '@/types/theme';

type ThemeSelectContextValue = {
  color: ThemeColor;
};

const ThemeSelectContext = createContext<ThemeSelectContextValue>({ color: 'blue' });

const useThemeSelect = () => useContext(ThemeSelectContext);

interface ThemeSelectProps extends React.ComponentProps<typeof Select> {
  color?: ThemeColor;
}

function ThemeSelect({ color = 'blue', ...props }: ThemeSelectProps) {
  return (
    <ThemeSelectContext.Provider value={{ color }}>
      <Select {...props} />
    </ThemeSelectContext.Provider>
  );
}

const itemColorStyles: Record<ThemeColor, string> = {
  blue: 'focus:text-hextech-blue-300 hover:text-hextech-blue-300 before:via-hextech-blue-900/40',
  gold: 'focus:text-hextech-gold-300 hover:text-hextech-gold-300 before:via-hextech-gold-900/40',
  red: 'focus:text-hextech-red-300 hover:text-hextech-red-300 before:via-hextech-red-900/40',
  green: 'focus:text-hextech-green-300 hover:text-hextech-green-300 before:via-hextech-green-900/40',
  purple: 'focus:text-hextech-purple-300 hover:text-hextech-purple-300 before:via-hextech-purple-900/40',
  silver: 'focus:text-hextech-silver-300 hover:text-hextech-silver-300 before:via-hextech-silver-900/40',
};

function ThemeSelectItem({ className, ...props }: React.ComponentProps<typeof SelectItem>) {
  const { color } = useThemeSelect();
  return <SelectItem className={cn(itemColorStyles[color], className)} {...props} />;
}

// Re-export other components unchanged or simply wrapped if needed in future
// For now, only SelectItem needed style injection based on requirement, but
// the user might want Trigger to be themed too?
// The prompt said: "Select, SelectContent, SelectItem, SelectTrigger, SelectValue...".
// Actually the previous code had specific border colors for Trigger and Content in CreateRoomModal.
// To fully "theme" it, we should probably allow passing styles or abstracting them.
// But CreateRoomModal passed specific border colors via className.
// If we want `ThemeSelect` to control those, we'd need more styles.
// For now, I will match `ThemeBox` logic or just handle `SelectItem` hover as explicitly requested ("hover 시 gold 색상").
// The request 405 specifically mentioned "color removal from select.tsx" and "ThemeSelect to wrap".
// I've handled `SelectItem`.

export {
  ThemeSelect,
  ThemeSelect as Select, // Alias for ease of replacement if desired, but user likely wants 'ThemeSelect' name
  SelectContent,
  SelectGroup,
  ThemeSelectItem as SelectItem, // Export wrapped component as SelectItem
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger, // Export original
  SelectValue,
};
