import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          DEFAULT: '#A85F67',
          deep: '#4A3038',
          light: '#C98188',
          soft: '#E9B8BA',
          pop: '#C96D67',
        },
        paper: {
          DEFAULT: '#FFFDF8',
          warm: '#FFF8EF',
          ivory: '#F5EBDD',
        },
        champagne: {
          DEFAULT: '#C9A15A',
          soft: '#E8D2A7',
        },
        ink: '#3E342F',
        scrapbook: {
          cream: '#FFF8EF',
          blush: '#F3D7D5',
          rose: '#C97873',
          berry: '#7A4652',
          sage: '#8A9671',
          butter: '#F1DFA8',
          cocoa: '#5A463D',
          paper: '#FFFCF6',
        },
      },
      fontFamily: {
        serif: ['var(--font-editorial)'],
        cover: ['var(--font-cover)'],
        sans: ['var(--font-sans)'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        soundbar: {
          '0%, 100%': { height: '4px' },
          '50%': { height: '14px' },
        },
        scrapbookFloat: {
          '0%, 100%': { transform: 'rotate(-1deg) translateY(0)' },
          '50%': { transform: 'rotate(1deg) translateY(-4px)' },
        },
      },
      animation: {
        soundbar: 'soundbar 1.1s ease-in-out infinite',
        scrapbookFloat: 'scrapbookFloat 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
