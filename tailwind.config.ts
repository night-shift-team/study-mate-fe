import type { Config } from 'tailwindcss';

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // src 폴더 내의 모든 파일
    './app/**/*.{js,ts,jsx,tsx,mdx}', // app 폴더 내의 모든 파일
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // pages 폴더 내의 모든 파일
    './components/**/*.{js,ts,jsx,tsx,mdx}', // components 폴더 내의 모든 파일
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
} satisfies Config;
