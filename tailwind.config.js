/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base:     '#080807',
          surface:  '#0d0c0a',
          elevated: '#141310',
          card:     '#1a1815',
        },
        accent: {
          DEFAULT: '#d4a853',
          hover:   '#e8c07a',
          dim:     'rgba(212,168,83,0.12)',
          muted:   'rgba(212,168,83,0.5)',
        },
        ink: {
          50:  '#f5f0e6',
          100: '#e8e0d0',
          200: '#c4bbaa',
          300: '#9d9385',
          400: '#706860',
          500: '#3e3830',
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
