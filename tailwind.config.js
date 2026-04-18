/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base:     '#0e0d0b',
          surface:  '#151410',
          elevated: '#1c1a16',
          card:     '#222018',
        },
        accent: {
          DEFAULT: '#d4a853',
          hover:   '#e8c07a',
          dim:     'rgba(212,168,83,0.14)',
          muted:   'rgba(212,168,83,0.55)',
        },
        ink: {
          50:  '#f7f2ea',
          100: '#ece5d6',
          200: '#d0c8b6',
          300: '#b0a694',
          400: '#877d6e',
          500: '#524a3e',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Noto Serif JP', 'Georgia', 'serif'],
        sans: ['Outfit', 'Noto Sans JP', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-up':    'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':    'fadeIn 1s ease-out forwards',
        'blink':      'blink 1.2s step-end infinite',
        'float':      'float 7s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow':  'spin 30s linear infinite',
        'shimmer':    'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
