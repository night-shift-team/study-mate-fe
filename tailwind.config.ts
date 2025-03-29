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
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': {
            top: '100%' /* 화면 아래에서 시작 */,
          },
          '10%': {
            top: '0%' /* 화면 중앙에 위치 */,
          },
          '33%': {
            top: '0%' /* 잠시 멈춤 */,
          },
          '43%': {
            top: '-100%' /* 화면 위로 사라짐 */,
          },
          '100%': {
            top: '-100%' /* 반복 */,
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease-in-out',
        'fade-up': 'fade-up 0.3s ease-in-out',
        'slide-up': 'slide-up 300ms linear infinite',
      },
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
          beigebrown: '#e8d7b9',
          yogurt: '#fdfbf3',
          sand: '#F0EDD4',
          apricot: '#ECCDB4',
          coral: '#FEA1A1',
          deepcoral: '#ec857e',
        },
        correctGreen: '#d4edda',
        wrongRed: '#f8d7da',
        goldBorder: '#e2d7c3',
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
