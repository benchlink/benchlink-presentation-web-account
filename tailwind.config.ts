import type { Config } from 'tailwindcss';
import theme, { themeColor } from './src/styles/theme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: theme.screens,
    extend: {
      colors: {
        ...themeColor,
      },
      ...theme,
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
} satisfies Config;
