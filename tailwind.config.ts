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
          DEFAULT: '#A30F30',
          deep: '#3D040F',
          light: '#C41E42',
          soft: '#E37E90',
          pop: '#C0123A',
        },
        paper: {
          DEFAULT: '#FFFFFF',
          warm: '#FFFCF8',
          ivory: '#F7F1E7',
        },
        champagne: {
          DEFAULT: '#C9A15A',
          soft: '#E4D3B0',
        },
        ink: '#1A0A0D',
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
      },
      animation: {
        soundbar: 'soundbar 1.1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
