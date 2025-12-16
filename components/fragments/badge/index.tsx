'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '~/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-[3px] transition-[color,box-shadow,background-color,border-color] overflow-hidden',
  {
    variants: {
      variant: {
        solid: 'border-transparent focus-visible:ring-[--badge-color]/50',
        outline: 'focus-visible:ring-[--badge-color]/30',
      },
    },
    defaultVariants: {
      variant: 'solid',
    },
  },
);

type TailwindColor =
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'
  | 'primary'
  | 'secondary'
  | 'destructive';

interface BadgeProps extends Omit<React.ComponentProps<'span'>, 'color'>, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  color?: TailwindColor;
}

// Tailwind color to HSL values mapping
const colorMap: Record<string, { light: string; dark: string }> = {
  slate: { light: '215 16% 47%', dark: '215 20% 65%' },
  gray: { light: '220 9% 46%', dark: '220 13% 69%' },
  zinc: { light: '240 5% 41%', dark: '240 5% 65%' },
  neutral: { light: '0 0% 45%', dark: '0 0% 71%' },
  stone: { light: '25 5% 45%', dark: '25 5% 65%' },
  red: { light: '0 84% 60%', dark: '0 72% 51%' },
  orange: { light: '25 95% 53%', dark: '25 90% 48%' },
  amber: { light: '38 92% 50%', dark: '38 92% 50%' },
  yellow: { light: '45 93% 47%', dark: '45 93% 47%' },
  lime: { light: '84 81% 44%', dark: '84 81% 44%' },
  green: { light: '142 71% 45%', dark: '142 76% 36%' },
  emerald: { light: '160 84% 39%', dark: '160 84% 39%' },
  teal: { light: '173 80% 40%', dark: '173 80% 40%' },
  cyan: { light: '189 94% 43%', dark: '189 94% 43%' },
  sky: { light: '199 89% 48%', dark: '199 89% 48%' },
  blue: { light: '217 91% 60%', dark: '217 91% 60%' },
  indigo: { light: '239 84% 67%', dark: '239 84% 67%' },
  violet: { light: '258 90% 66%', dark: '258 90% 66%' },
  purple: { light: '271 81% 56%', dark: '271 81% 56%' },
  fuchsia: { light: '292 84% 61%', dark: '292 84% 61%' },
  pink: { light: '330 81% 60%', dark: '330 81% 60%' },
  rose: { light: '350 89% 60%', dark: '350 89% 60%' },
};

const getColorStyles = (color: TailwindColor = 'primary', variant: 'solid' | 'outline' = 'solid') => {
  // Handle semantic colors with Tailwind classes
  if (color === 'primary') {
    return {
      className:
        variant === 'solid'
          ? 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90'
          : 'border-primary text-primary [a&]:hover:bg-primary/10',
      style: {},
    };
  }

  if (color === 'secondary') {
    return {
      className:
        variant === 'solid'
          ? 'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90'
          : 'border-secondary text-secondary [a&]:hover:bg-secondary/10',
      style: {},
    };
  }

  if (color === 'destructive') {
    return {
      className:
        variant === 'solid'
          ? 'bg-destructive text-white [a&]:hover:bg-destructive/90 dark:bg-destructive/60'
          : 'border-destructive text-destructive [a&]:hover:bg-destructive/10',
      style: {},
    };
  }

  // Handle Tailwind colors with CSS variables
  const colorValue = colorMap[color];
  if (!colorValue) {
    return getColorStyles('primary', variant);
  }

  const baseStyle = {
    '--badge-color': `hsl(${colorValue.light})`,
    '--badge-color-dark': `hsl(${colorValue.dark})`,
  } as React.CSSProperties;

  return {
    className: '[a&]:hover:opacity-80',
    style: {
      ...baseStyle,
      backgroundColor: `hsl(${colorValue.light} / 0.08)`,
      borderColor: 'var(--badge-color)',
      color: 'var(--badge-color)',
      '--tw-ring-color': 'var(--badge-color)',
    } as React.CSSProperties,
  };
};

function Badge({ className, variant, color = 'primary', asChild = false, style, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : 'span';
  const { className: colorClassName, style: colorStyle } = getColorStyles(color, variant ?? 'solid');

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), colorClassName, className)}
      style={{ ...colorStyle, ...style }}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
export type { BadgeProps, TailwindColor };
