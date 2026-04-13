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
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
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
      },
    },
  },
  plugins: [],
}
