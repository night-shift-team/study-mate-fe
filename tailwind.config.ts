/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';

module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // src 폴더 내의 모든 파일
    './app/**/*.{js,ts,jsx,tsx,mdx}', // app 폴더 내의 모든 파일
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // pages 폴더 내의 모든 파일
    './components/**/*.{js,ts,jsx,tsx,mdx}', // components 폴더 내의 모든 파일
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06)',
        light: '0px 2px 4px rgba(0, 0, 0, 0.08)',
        strong: '0px 6px 10px rgba(0, 0, 0, 0.15)',

        'inner-right': 'inset 2px 0 0 #000', // 오른쪽 내부 테두리
      },
      fontFamily: {
        spoqa: ['Spoqa Han Sans Neo', 'sans-serif'],
        doodle: ['CustomFontDoodle', 'sans-serif'],
      },
      colors: {
        pointcolor: {
          beige: '#F9FBE7',
          sand: '#F0EDD4',
          apricot: '#ECCDB4',
          coral: '#FEA1A1',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-animate'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwindcss-inner-border'),
  ],
} satisfies Config;
