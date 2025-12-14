import typography from '@tailwindcss/typography';
import { CSSProperties } from 'react';
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('var(--color-foreground)'),
            p: {
              margin: 0,
              color: theme('var(--color-foreground)'),
            } as CSSProperties,
            ul: {
              margin: 0,
              color: theme('var(--color-foreground)'),
              paddingLeft: 0,
            } as CSSProperties,
            ol: {
              color: theme('var(--color-foreground)'),
              margin: 0,
              paddingLeft: 0,
            } as CSSProperties,
            li: {
              color: theme('var(--color-foreground)'),
              margin: 0,
            } as CSSProperties,
            'ul > li::marker': {
              color: theme('var(--color-foreground)'),
            },
            'ol > li::marker': {
              color: theme('var(--color-foreground)'),
            },
            strong: {
              color: theme('var(--color-foreground)'),
              fontWeight: '600',
            },
            h1: {
              color: theme('var(--color-foreground)'),
              margin: 0,
            } as CSSProperties,
            h2: {
              color: theme('var(--color-foreground)'),
              margin: 0,
            } as CSSProperties,
            h3: {
              color: theme('var(--color-foreground)'),
              margin: 0,
            } as CSSProperties,
            code: {
              backgroundColor: theme('colors.slate.100'),
              padding: '0.15em 0.3em',
              borderRadius: theme('borderRadius.sm'),
              fontWeight: '400',
            } as CSSProperties,

            pre: {
              backgroundColor: theme('colors.slate.900'),
              color: theme('colors.slate.100'),
              padding: theme('spacing.3'),
              borderRadius: theme('borderRadius.md'),
            } as CSSProperties,

            blockquote: {
              borderLeftColor: theme('colors.slate.300'),
              fontStyle: 'normal',
            } as CSSProperties,
          },
        },
      }),
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'slide-from-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-to-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'slide-from-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-to-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-from-left': 'slide-from-left 0.3s ease-out',
        'slide-to-left': 'slide-to-left 0.3s ease-out',
        'slide-from-right': 'slide-from-right 0.3s ease-out',
        'slide-to-right': 'slide-to-right 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
      },
    },
  },
  plugins: [typography()],
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
};
export default config;
