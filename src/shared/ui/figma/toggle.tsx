'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { type VariantProps } from 'class-variance-authority';

import { toggleVariants } from '@/shared/ui/figma/toggleVariants';
import { cn } from '@/shared/ui/figma/utils';

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root data-slot='toggle' className={cn(toggleVariants({ variant, size, className }))} {...props} />
  );
}

export default Toggle;
