import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        porcelain: '#FBF6F4',
        blush: '#F6DCE1',
        rose: '#E1899B',
        rosewood: '#8E4257',
        ink: '#211C1E',
        taupe: '#8C8079',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(4rem, 15vw, 15rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'display-l': ['clamp(2.25rem, 6vw, 5.5rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display-m': ['clamp(1.5rem, 3.2vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        lead: ['clamp(1.15rem, 1.7vw, 1.45rem)', { lineHeight: '1.55' }],
        label: ['0.72rem', { lineHeight: '1.4', letterSpacing: '0.22em' }],
      },
      spacing: {
        section: 'clamp(6rem, 13vh, 12rem)',
      },
      maxWidth: {
        prose: '66ch',
      },
      zIndex: {
        base: '10',
        raised: '20',
        overlay: '30',
        header: '50',
        loader: '60',
        cursor: '70',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        slow: '600ms',
        slower: '900ms',
      },
      borderRadius: {
        card: '1.5rem',
        band: '2.5rem',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
