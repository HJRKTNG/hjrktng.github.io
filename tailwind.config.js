/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base:     '#0a0e17',
          surface:  '#0f1623',
          elevated: '#161f30',
          card:     '#1a2235',
        },
        accent: {
          DEFAULT: '#38bdf8',
          hover:   '#7dd3fc',
          dim:     'rgba(56,189,248,0.12)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'Hiragino Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-up':      'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':      'fadeIn 0.8s ease-out forwards',
        'fade-left':    'fadeLeft 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-right':   'fadeRight 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in':     'scaleIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        'blink':        'blink 1s step-end infinite',
        'float':        'float 6s ease-in-out infinite',
        'pulse-slow':   'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow':    'spin 20s linear infinite',
        'gradient':     'gradient 8s ease infinite',
        'slide-in-nav': 'slideInNav 0.3s cubic-bezier(0.16,1,0.3,1) forwards',
        'shimmer':      'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        fadeLeft: {
          from: { opacity: '0', transform: 'translateX(-32px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        fadeRight: {
          from: { opacity: '0', transform: 'translateX(32px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        slideInNav: {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
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
