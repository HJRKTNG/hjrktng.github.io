/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* 計測器の筐体 — ガンメタル / アルマイト黒 */
        bg: {
          deep:  '#050607',
          base:  '#08090A',
          panel: '#0E1113',
          rail:  '#141A1D',
        },
        line: {
          DEFAULT: '#1C2427',
          bright:  '#2C383D',
        },
        /* 光ファイバーのシアン */
        sig: {
          DEFAULT: '#4FD8E0',
          bright:  '#9DF2F7',
          deep:    '#1E8F96',
        },
        /* 基板の金メッキ */
        gold: {
          DEFAULT: '#C9A227',
          dim:     '#8A6F1B',
        },
        ink: {
          50:  '#F1F5F6',
          100: '#DCE4E6',
          200: '#B6C2C6',
          300: '#8B999F',
          400: '#5F6E75',
          500: '#3B474C',
        },
      },
      fontFamily: {
        display: ['"IBM Plex Sans Condensed"', '"Zen Kaku Gothic New"', 'sans-serif'],
        sans:    ['"IBM Plex Sans"', '"Zen Kaku Gothic New"', 'sans-serif'],
        mono:    ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        label: '0.32em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'scan':       'scan 3.2s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0)',      opacity: '0.15' },
          '50%':      { transform: 'translateY(100%)',   opacity: '0.5'  },
        },
      },
    },
  },
  plugins: [],
}
